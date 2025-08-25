const {
  Blocks,
  ContentTranslations,
  Buttons,
  ContentButtonTranslations,
  ButtonsToBlocks,
} = require('../models');

const { WEB_URL } = process.env;

const buildKeyboard = (buttons = [], translations = []) => {
  const get = (obj, ...keys) => {
    for (const k of keys)
      if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
    return undefined;
  };

  const toPlain = (obj) =>
    obj && typeof obj.get === 'function' ? obj.get({ plain: true }) : obj;

  const plainButtons = (buttons || []).map(toPlain);
  const plainTranslations = (translations || []).map(toPlain);

  const byButtonId = plainTranslations.reduce((acc, t) => {
    const id = get(t, 'buttonId', 'button_id');
    if (id !== undefined) acc[id] = t;
    return acc;
  }, {});

  const getOrder = (btn) => get(btn, 'order') ?? get(btn, 'raw.order') ?? 0;

  const ordered = plainButtons
    .slice()
    .sort((a, b) => getOrder(a) - getOrder(b));

  const rowsMap = {};

  ordered.forEach((btn) => {
    const keyboardType = get(btn, 'keyboardType', 'keyboard_type') || 'inline';
    const row = Number(get(btn, 'rowOrder', 'row_order') ?? 0);
    const isFull = !!(
      get(btn, 'isFullWidth', 'is_full_width') ||
      get(btn, 'isFull') ||
      false
    );
    const id = get(btn, 'buttonId', 'button_id') ?? get(btn, 'id');
    const label = byButtonId[id]?.label ?? btn.label ?? 'button';
    rowsMap[keyboardType] = rowsMap[keyboardType] || {};
    rowsMap[keyboardType][row] = rowsMap[keyboardType][row] || [];
    const item = {
      id,
      text: label,
      isFull,
      type: get(btn, 'type'),
      url: get(btn, 'url'),
      callback: get(btn, 'callback'),
      web_app:
        get(btn, 'web_app') ||
        (get(btn, 'type') === 'web_app' && get(btn, 'url')
          ? { url: get(btn, 'url') }
          : undefined),
      raw: btn,
    };
    rowsMap[keyboardType][row].push(item);
  });

  const buildRows = (map) =>
    Object.keys(map || {})
      .map((k) => Number(k))
      .sort((a, b) => a - b)
      .map((k) => map[k]);

  const replyMap = rowsMap.reply || {};
  const inlineMap = rowsMap.inline || {};

  const replyRowsRaw = buildRows(replyMap);
  const inlineRows = buildRows(inlineMap);

  if (replyRowsRaw.length) {
    const replyRows = [];
    replyRowsRaw.forEach((row) => {
      const normals = row.filter((c) => !c.isFull);
      const fulls = row.filter((c) => c.isFull);
      if (normals.length)
        replyRows.push(
          normals.map((n) =>
            n.web_app ? { text: n.text, web_app: n.web_app } : { text: n.text },
          ),
        );
      fulls.forEach((f) =>
        replyRows.push([
          f.web_app ? { text: f.text, web_app: f.web_app } : { text: f.text },
        ]),
      );
    });
    return {
      keyboard: replyRows,
      resize_keyboard: true,
      one_time_keyboard: false,
    };
  }

  if (inlineRows.length) {
    const inlineKeyboard = inlineRows.map((row) =>
      row.map((item) => {
        if (item.type === 'url' && item.url)
          return { text: item.text, url: item.url };
        if (item.type === 'web_app' && item.url)
          return { text: item.text, web_app: { url: item.url } };
        return {
          text: item.text,
          callback_data: item.callback || `button:${item.id || ''}`,
        };
      }),
    );
    return { inline_keyboard: inlineKeyboard };
  }

  return null;
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
      order: [
        ['row_order', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    const buttons = assocs.map((a) => {
      const rawBtn =
        a.button && a.button.get
          ? a.button.get({ plain: true })
          : a.button || {};
      const btnId = rawBtn.buttonId ?? rawBtn.id;
      const isFullFromAssoc = a.isFullWidth ?? a.is_full_width;
      const rowFromAssoc = a.rowOrder ?? a.row_order;
      const isFullFromBtn = rawBtn.isFullWidth ?? rawBtn.is_full_width;
      const rowFromBtn = rawBtn.rowOrder ?? rawBtn.row_order;
      const isFull =
        typeof isFullFromAssoc !== 'undefined'
          ? !!isFullFromAssoc
          : !!isFullFromBtn;
      const rowOrder = Number(
        typeof rowFromAssoc !== 'undefined'
          ? rowFromAssoc
          : typeof rowFromBtn !== 'undefined'
            ? rowFromBtn
            : 0,
      );
      return {
        ...rawBtn,
        buttonId: btnId,
        isFullWidth: isFull,
        rowOrder,
        translations: rawBtn.translations ?? [],
      };
    });

    const translations = buttons.flatMap((b) =>
      (b.translations || []).map((t) => ({
        buttonId: b.buttonId,
        label: t.label,
        language: t.language,
      })),
    );
    const replyMarkup = buildKeyboard(buttons, translations);

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
