const fs = require('fs');
const path = require('path');

const {
  Blocks,
  Buttons,
  ContentTranslations,
  ContentButtonTranslations,
  ButtonsToBlocks,
} = require('../../models');
const { or } = require('sequelize');

const getAllBlocks = async () => {
  const blocks = await Blocks.findAll({
    include: [
      { model: ContentTranslations, as: 'translations' },
      {
        model: Buttons,
        as: 'buttons',
        include: [{ model: ContentButtonTranslations, as: 'translations' }],
      },
    ],
    raw: false,
    nest: true,
  });

  const map = {};
  const tree = [];

  const plain = blocks.map((b) => b.toJSON());

  plain.forEach((block) => {
    map[block.blockId] = { ...block, children: [] };
  });

  plain.forEach((block) => {
    if (block.parentId) {
      if (map[block.parentId]) {
        map[block.parentId].children.push(map[block.blockId]);
      }
    } else {
      tree.push(map[block.blockId]);
    }
  });

  return tree;
};

const getContentBlockById = ({ blockId }) => {
  return Blocks.findByPk(blockId, {
    include: [
      { model: ContentTranslations, as: 'translations' },
      {
        model: Buttons,
        as: 'buttons',
        include: [{ model: ContentButtonTranslations, as: 'translations' }],
      },
    ],
  });
};

const createContentBlock = async (args, res) => {
  const { parentId, order, code, content } = args;

  if (!parentId) {
    return res.status(403).json({
      error: `Parent ID is required for this field`,
    });
  }

  if (!Array.isArray(content) || content.length === 0) {
    return res.status(403).json({
      error: `Content array is required and cannot be empty`,
    });
  }

  try {
    const contentBlock = await Blocks.create({ parentId, order, code });

    const translationsData = content.map((item) => ({
      blockId: contentBlock.blockId,
      language: item.language,
      text: item.text,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    }));

    await ContentTranslations.bulkCreate(translationsData);

    const result = await getContentBlockById({
      blockId: contentBlock.blockId,
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateContentBlock = async ({ blockId, req, res }) => {
  const { parentId, code, order, content } = req.body;

  if (!blockId) {
    return res.status(403).json({ error: 'blockId is required' });
  }

  try {
    await Blocks.update({ parentId, code, order }, { where: { blockId } });

    if (Array.isArray(content)) {
      for (const item of content) {
        const [translation, created] = await ContentTranslations.findOrCreate({
          where: { blockId: blockId, language: item.language },
          defaults: {
            text: item.text,
            mediaUrl: item.mediaUrl,
            mediaType: item.mediaType,
          },
        });

        if (!created) {
          await translation.update({
            text: item.text,
            mediaUrl: item.mediaUrl,
            mediaType: item.mediaType,
          });
        }
      }
    }

    return getContentBlockById({ blockId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createTranslationForBlock = async ({
  blockId,
  lang,
  args,
  file,
  res,
}) => {
  const block = await Blocks.findOne({ where: { blockId } });
  if (!block)
    return res.status(403).json({ error: `Block with ${blockId} not found` });

  let mediaUrl = args.mediaUrl || null;

  const [translation, created] = await ContentTranslations.findOrCreate({
    where: { blockId, language: lang },
    defaults: {
      text: args.text,
      mediaUrl: `/uploads/${file.filename}`,
      mediaType: args.mediaType,
    },
  });

  if (!created) {
    if (file) {
      if (translation.mediaUrl) {
        const oldFilePath = path.join(
          process.cwd(),
          translation.mediaUrl.replace(/^\/+/, ''),
        );
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          } else {
          }
        } catch (err) {
          console.error('Error deleting old file:', err);
        }
      }
      mediaUrl = `/uploads/${file.filename}`;
    }

    await translation.update({
      text: args.text,
      mediaUrl,
      mediaType: args.mediaType,
    });
  } else if (file) {
    mediaUrl = `/uploads/${file.filename}`;
  }

  return getContentBlockById({ blockId });
};

const deleteContentBlock = async ({ blockId }) => {
  await ContentTranslations.destroy({ where: { blockId: blockId } });
  await Blocks.destroy({ where: { blockId } });
  await ButtonsToBlocks.destroy({ where: { blockId } });
  return { success: true };
};

const getContentButtonById = async ({ buttonId }) => {
  return Buttons.findOne({
    where: { buttonId },
    include: [{ model: ContentButtonTranslations, as: 'translations' }],
  });
};

const createContentButton = async (req, res) => {
  const { blockId, translations, isFullWidth, rowOrder, order } = req.body;

  if (!blockId) {
    return res.status(403).json({ error: 'blockId is required' });
  }

  if (!Array.isArray(translations) || translations.length === 0) {
    return res.status(403).json({ error: 'translations array is required' });
  }

  try {
    const button = await Buttons.create({ ...req.body });

    await ButtonsToBlocks.create({
      blockId,
      buttonId: button.buttonId,
      isFullWidth,
      rowOrder,
      order,
    });

    const translationData = translations.map((t) => ({
      buttonId: button.buttonId,
      language: t.language,
      label: t.label,
    }));

    await ContentButtonTranslations.bulkCreate(translationData);

    const result = await getContentButtonById({ buttonId: button.buttonId });
    return result;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateContentButton = async (args) => {
  const { buttonId, translations, isFullWidth, rowOrder, order } = args;

  const btn = await Buttons.findOne({
    where: {
      buttonId,
    },
  });

  if (!btn) return;
  await btn.update({ ...args });

  if (Array.isArray(translations)) {
    for (const tr of translations) {
      const [translation, created] =
        await ContentButtonTranslations.findOrCreate({
          where: { buttonId, language: tr.language },
          defaults: { label: tr.label },
        });

      if (!created) {
        await translation.update({ label: tr.label });
      }
    }
  }

  return getContentButtonById({ buttonId });
};

const deleteContentButton = async ({ buttonId }) => {
  await ContentButtonTranslations.destroy({ where: { buttonId } });
  await Buttons.destroy({ where: { buttonId } });
  await ButtonsToBlocks.create({
    buttonId,
  });
  return { success: true };
};

const getAllButtons = async () => {
  return Buttons.findAll({
    include: [{ model: ContentButtonTranslations, as: 'translations' }],
  });
};

module.exports = {
  getAllBlocks,
  createContentBlock,
  getContentBlockById,
  updateContentBlock,
  deleteContentBlock,
  getAllButtons,
  getContentButtonById,
  createContentButton,
  updateContentButton,
  deleteContentButton,
  createTranslationForBlock,
};
