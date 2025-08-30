const {
  Blocks,
  ContentTranslations,
  Buttons,
  ContentButtonTranslations,
  ButtonsToBlocks,
} = require('../models');

const { WEB_URL } = process.env;

const buildKeyboard = (buttons = []) => {
  const fullWidthButtons = buttons
    .filter((b) => b.isFullWidth)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const groupedByRow = buttons
    .filter((b) => !b.isFullWidth)
    .reduce((acc, btn) => {
      (acc[btn.rowOrder ?? 0] ||= []).push(btn);
      return acc;
    }, {});

  Object.values(groupedByRow).forEach((row) =>
    row.sort((a, b) => a.order - b.order),
  );

  const result = [...fullWidthButtons, ...Object.values(groupedByRow)].sort(
    (a, b) => {
      const orderA = Array.isArray(a) ? a[0].rowOrder : a.order;
      const orderB = Array.isArray(b) ? b[0].rowOrder : b.order;
      return (orderA ?? 0) - (orderB ?? 0);
    },
  );

  const keyboardType = result[0]?.keyboardType || 'reply';
  console.log('keyboardType', keyboardType);

  const keyboard = result.map((item) =>
    Array.isArray(item)
      ? item.map((btn) => {
          if (btn.type === 'url') return { text: btn.label, url: btn.url };
          if (btn.type === 'callback')
            return { text: btn.label, callback_data: String(btn.buttonId) };
          if (btn.type === 'web_app')
            return { text: btn.label, web_app: { url: btn.url } };
          return { text: btn.label };
        })
      : [
          (() => {
            const btn = item;
            if (btn.type === 'url') return { text: btn.label, url: btn.url };
            if (btn.type === 'callback')
              return { text: btn.label, callback_data: String(btn.buttonId) };
            if (btn.type === 'web_app')
              return { text: btn.label, web_app: { url: btn.url } };
            return { text: btn.label };
          })(),
        ],
  );

  const replyMarkup =
    keyboardType === 'reply'
      ? { keyboard, resize_keyboard: true }
      : { inline_keyboard: keyboard };

  return replyMarkup;
};

const toPlain = (obj) =>
  obj && typeof obj.get === 'function' ? obj.get({ plain: true }) : obj || {};

const extractButtonsFromAssocs = (assocs) => {
  if (!Array.isArray(assocs)) return [];
  return assocs.map((a) => {
    const assoc = toPlain(a);
    const btn = toPlain(assoc.button);

    const order = assoc.order ?? btn.order ?? 0;
    const rowOrder = assoc.rowOrder ?? btn.rowOrder ?? 0;
    const isFullWidth = assoc.isFullWidth ?? btn.isFullWidth ?? false;

    const translations = (btn.translations || []).map((t) => ({
      buttonId: btn.buttonId,
      label: t.label ?? '',
      language: t.language ?? '',
    }));

    return {
      ...btn,
      order,
      rowOrder: isFullWidth ? null : rowOrder,
      isFullWidth,
      label: translations[0]?.label || btn.label || '',
    };
  });
};

const mapContentRow = (row) => {
  if (!row) return null;
  return {
    text: row.text ?? '',
    mediaUrl: row.mediaUrl ?? null,
    mediaType: row.mediaType ?? 'none',
  };
};

const sendMediaOrText = async (bot, chatId, content, replyMarkup) => {
  try {
    const options = {
      parse_mode: 'HTML',
      ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
    };
    if (!content) return await bot.sendMessage(chatId, 'No content', options);
    let { mediaType, mediaUrl, text } = content;

    if (mediaUrl && !/^https?:\/\//i.test(mediaUrl)) {
      mediaUrl = `${process.env.WEB_URL || ''}${mediaUrl}`;
    }
    if (mediaType === 'photo' && mediaUrl)
      return await bot.sendPhoto(chatId, mediaUrl, {
        caption: text,
        ...options,
      });
    if (mediaType === 'video' && mediaUrl)
      return await bot.sendVideo(chatId, mediaUrl, {
        caption: text,
        ...options,
      });
    if (mediaType === 'document' && mediaUrl)
      return await bot.sendDocument(chatId, mediaUrl, {
        caption: text,
        ...options,
      });
    if (mediaType === 'gif' && mediaUrl)
      return await bot.sendAnimation(chatId, mediaUrl, {
        caption: text,
        ...options,
      });

    return await bot.sendMessage(chatId, text || '', options);
  } catch (ex) {
    console.error(ex);
  }
};

const sendBlock = async (
  bot,
  chatId,
  blockId = null,
  language = 'en',
  code = null,
) => {
  const blocks = code
    ? await Blocks.findAll({ where: { code }, order: [['order', 'ASC']] })
    : blockId
      ? [await Blocks.findOne({ where: { blockId } })]
      : [];

  if (!blocks || !blocks.length) return;

  for (const block of blocks) {
    if (!block) continue;
    const contentRows = await ContentTranslations.findAll({
      where: { blockId: block.blockId, language },
      order: [['contentTranslationsId', 'ASC']],
    });

    const assocs = await ButtonsToBlocks.findAll({
      where: { blockId: block.blockId },
      include: [
        {
          model: Buttons,
          as: 'button',
          include: [
            {
              model: ContentButtonTranslations,
              as: 'translations',
              where: { language },
              required: false,
            },
          ],
        },
      ],
    });

    const buttonsSimple = extractButtonsFromAssocs(assocs);
    const replyMarkup = buildKeyboard(buttonsSimple);

    if (!contentRows || !contentRows.length) {
      await sendMediaOrText(bot, chatId, null, replyMarkup);
      continue;
    }

    for (let i = 0; i < contentRows.length; i++) {
      const content = mapContentRow(contentRows[i]);
      const markup = i === contentRows.length - 1 ? replyMarkup : null;
      await sendMediaOrText(bot, chatId, content, markup);
    }
  }
};

module.exports = { sendBlock, sendMediaOrText, buildKeyboard };
