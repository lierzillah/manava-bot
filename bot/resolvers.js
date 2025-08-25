const {
  Users,
  UsersEvents,
  Blocks,
  ContentTranslations,
  Buttons,
  ContentButtonTranslations,
  ButtonsToBlocks,
} = require('../models');

const getUserBotInfo = ({ telegramId, username, language }) => {
  return Users.findOrCreate({
    where: {
      telegramId,
    },
    defaults: {
      role: 'user_bot',
      language,
      username,
      telegramId,
    },
  });
};

const updateUserInfo = async ({ telegramId, language }) => {
  const user = await Users.findOne({
    where: {
      telegramId,
    },
  });

  await user.update({ language });
  return user;
};

const logAction = async ({ telegramId, type, label }) => {
  const [user] = await getUserBotInfo({ telegramId });

  if (label !== '/start') {
    const btn = await ContentButtonTranslations.findOne({
      where: { label },
    });

    if (!btn) return;

    const metadata = {
      button_id: btn.buttonId,
      block_id: btn.blockId,
      label: btn.label,
      language: user.language,
      callback_data: btn.callbackData,
      row_order: btn.rowOrder,
      order: btn.order,
      is_full_width: btn.isFullWidth,
      context: btn.context,
      telegram_id: telegramId,
      username: user.username,
      timestamp: new Date().toISOString(),
    };

    const clickEvent = await UsersEvents.create({
      userId: user.userId,
      type,
      metadata,
      buttonId: btn.buttonId,
    });

    const btnBlock = await ButtonsToBlocks.findOne({
      where: {
        buttonId: btn.buttonId,
      },
    });

    if (type === 'click' && btnBlock) {
      const block = await Blocks.findOne({
        where: { blockId: btnBlock.blockId },
      });

      if (block) {
        const translation = await ContentTranslations.findOne({
          where: {
            blockId: block.blockId,
            language: user.language,
          },
        });

        if (translation) {
          const viewMetadata = {
            block_id: block.blockId,
            translation_id: translation.contentTranslationsId,
            media_url: translation.media_url,
            media_type: translation.media_type,
            block_text: translation.text.slice(0, 30),
            telegram_id: telegramId,
            username: user.username,
            language: user.language,
            context: 'content_view',
            timestamp: new Date().toISOString(),
          };

          await UsersEvents.create({
            userId: user.userId,
            type: 'content_view',
            metadata: viewMetadata,
            blockId: block.blockId,
          });
        }
      }
    }

    return clickEvent;
  }

  const metadata = {
    command: '/start',
    telegram_id: telegramId,
    username: user.username,
    language: user.language,
    context: 'command',
    timestamp: new Date().toISOString(),
  };

  return UsersEvents.create({
    userId: user.userId,
    type,
    metadata,
  });
};

module.exports = { getUserBotInfo, updateUserInfo, logAction };
