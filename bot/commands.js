const { Buttons, ContentButtonTranslations } = require('../models');
const { sendBlock, sendMediaOrText, buildKeyboard } = require('./handlers');
const { getUserBotInfo, updateUserInfo, logAction } = require('./resolvers');
const { findSelectedLang, allLanguages } = require('./lang');

const initContentHandlers = (bot, options = {}) => {
  const languageResolver =
    options.getLanguageForMessage ||
    ((msg) => (msg.from && msg.from.language_code) || 'en');

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    const username = msg.from.username || null;

    const [user] = await getUserBotInfo({
      telegramId: String(telegramId),
      language: languageResolver(msg),
      username,
    });

    let language = user?.language || 'en';
    const allLangs = allLanguages();

    if (text === '/start') {
      await logAction({
        telegramId: String(telegramId),
        type: 'start',
        label: text,
      });
      await sendBlock(bot, chatId, 1, language, 'start');
    } else if (allLangs.includes(text)) {
      const lang = findSelectedLang(text, language);
      if (lang) {
        const user = await updateUserInfo({
          telegramId: String(telegramId),
          language: lang.key,
        });
        language = user.language;

        await logAction({
          telegramId: String(telegramId),
          type: 'lang_change',
          label: text,
        });
      }
    } else {
      await logAction({
        telegramId: String(telegramId),
        type: 'click',
        label: text,
      });
    }

    const btn = await Buttons.findOne({
      where: { keyboardType: 'reply' },
      include: [
        {
          model: ContentButtonTranslations,
          as: 'translations',
          where: { label: text },
          required: true,
        },
      ],
    });

    if (!btn) return;

    if (btn.nextBlockId) {
      await sendBlock(bot, chatId, btn.nextBlockId, language);
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const data = callbackQuery.data || '';
    const chatId =
      callbackQuery.message &&
      callbackQuery.message.chat &&
      callbackQuery.message.chat.id;
    if (!chatId) return;

    const telegramId = callbackQuery.from?.id;

    const user = await getUserBotInfo({
      telegramId: String(telegramId),
    });

    const language = user?.language || 'en';

    if (data.startsWith('block:')) {
      const order = Number(data.split(':')[1]);
      await sendBlock(
        bot,
        chatId,
        Number.isFinite(order) ? order : 0,
        language,
        models,
      );
      await bot.answerCallbackQuery(callbackQuery.id);
      return;
    }
    if (data.startsWith('button:')) {
      await bot.answerCallbackQuery(callbackQuery.id);
      return;
    }
    await bot.answerCallbackQuery(callbackQuery.id);
  });
};

module.exports = { initContentHandlers };
