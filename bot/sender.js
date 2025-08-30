const moment = require('moment');
const { Users, Broadcasts, BroadcastContents } = require('../models');
const { logAction } = require('./resolvers');

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const sendBroadcastMessage = async ({ bot }) => {
  console.log('-------- LOG ---------');
  const now = moment();

  const broadcasts = await Broadcasts.findAll({
    where: { status: 'scheduled' },
    include: [
      {
        model: BroadcastContents,
        as: 'contents',
      },
    ],
  });

  for (const broadcast of broadcasts) {
    const scheduledTime = moment(broadcast.scheduledAt);
    if (!now.isSameOrAfter(scheduledTime)) continue;

    const intervalCount = Math.max(broadcast.intervalCount || 500, 1);
    const intervalDelayMinutes = Math.max(
      broadcast.intervalDelayMinutes || 5,
      0,
    );

    const users = await Users.findAll({ where: { sendNotifications: true } });
    const userChunks = chunkArray(users, intervalCount);

    const metadata = {
      broadcast_id: broadcast.broadcastId,
      scheduled_at: broadcast.scheduledAt,
      title: broadcast.title,
      interval_count: broadcast.intervalCount,
      language: broadcast.intervalDelayMinutes,
      repeat_interval_days: broadcast.repeatIntervalDays,
      status: broadcast.status,
      language: broadcast.contents.language,
      error_msg: broadcast.errorMsg,
      timestamp: new Date().toISOString(),
    };

    for (let i = 0; i < userChunks.length; i++) {
      const chunk = userChunks[i];

      for (const user of chunk) {
        if (!user.telegramId) continue;
        for (const content of broadcast.contents) {
          const lang = user.language || 'en';
          if (content.language !== lang) continue;
          try {
            await sendTelegramMessage({
              bot,
              chatId: user.telegramId,
              content,
              broadcastId: broadcast.broadcastId,
            });

            await logAction({
              telegramId: user.telegramId,
              type: 'broadcast_view',
              metadata,
            });
          } catch (e) {
            broadcast.status = 'failed';
            broadcast.errorMsg = e.message;
            await broadcast.save();
            return;
          }
        }
      }

      if (i < userChunks.length - 1 && intervalDelayMinutes > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, intervalDelayMinutes * 60 * 1000),
        );
      }
    }

    broadcast.status = 'done';
    await broadcast.save();
  }
};

const prepareInlineKeyboard = (buttons) => {
  if (!buttons) return [];
  if (Array.isArray(buttons)) {
    return buttons.map((btn) => {
      const text = btn.text || 'Button';
      if (btn.url) return [{ text, url: btn.url }];
      if (btn.web_app) return [{ text, web_app: { url: btn.web_app } }];
      if (btn.next_block_id)
        return [{ text, callback_data: btn.next_block_id }];
      return [{ text, callback_data: text.replace(/\s+/g, '_') }];
    });
  } else if (typeof buttons === 'object') {
    const text = buttons.text || 'Button';
    if (buttons.url) return [[{ text, url: buttons.url }]];
    if (buttons.web_app) return [[{ text, web_app: { url: buttons.web_app } }]];
    if (buttons.next_block_id)
      return [[{ text, callback_data: buttons.next_block_id }]];
    return [[{ text, callback_data: text.replace(/\s+/g, '_') }]];
  }
  return [];
};

const sendTelegramMessage = async ({ bot, chatId, content, broadcastId }) => {
  try {
    const opts = {};

    let buttonsData = content.buttons;
    if (typeof buttonsData === 'string') {
      try {
        buttonsData = JSON.parse(buttonsData);
      } catch (e) {
        buttonsData = null;
      }
    }

    if (content.buttons && Object.keys(content.buttons).length) {
      opts.reply_markup = {
        inline_keyboard: prepareInlineKeyboard(buttonsData),
      };
    }

    if (content.mediaType && content.mediaType !== 'none' && content.mediaUrl) {
      if (content.mediaType === 'photo') {
        await bot.sendPhoto(chatId, content.mediaUrl, {
          caption: content.text || '',
          ...opts,
        });
      } else if (content.mediaType === 'video') {
        await bot.sendVideo(chatId, content.mediaUrl, {
          caption: content.text || '',
          ...opts,
        });
      } else if (content.mediaType === 'document') {
        await bot.sendDocument(chatId, content.mediaUrl, {
          caption: content.text || '',
          ...opts,
        });
      } else if (content.mediaType === 'gif') {
        await bot.sendAnimation(chatId, content.mediaUrl, {
          caption: content.text || '',
          ...opts,
        });
      }
    } else {
      await bot.sendMessage(chatId, content.text || '', opts);
    }
    return;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { sendBroadcastMessage };
