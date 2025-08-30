const Sequelize = require('sequelize');
const sequelize = require('../config').sequelize;

const Blocks = sequelize.define(
  'Blocks',
  {
    blockId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parentId: {
      type: Sequelize.INTEGER,
    },
    code: { type: Sequelize.STRING, unique: true },
    order: Sequelize.INTEGER,
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  {
    schema: 'public',
    tableName: 'blocks',
    timestamps: true,
    underscored: true,
  },
);

const ContentTranslations = sequelize.define(
  'ContentTranslations',
  {
    contentTranslationsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blockId: {
      type: Sequelize.INTEGER,
    },
    language: {
      type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
      defaultValue: 'ua',
    },
    text: Sequelize.TEXT,
    mediaUrl: Sequelize.STRING,
    mediaType: {
      type: Sequelize.ENUM('photo', 'video', 'document', 'gif', 'none'),
      defaultValue: 'none',
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  {
    schema: 'public',
    tableName: 'content_translations',
    timestamps: true,
    underscored: true,
  },
);

const Buttons = sequelize.define(
  'Buttons',
  {
    buttonId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: Sequelize.STRING,
    order: Sequelize.INTEGER,
    type: {
      type: Sequelize.ENUM('url', 'callback', 'none'),
      defaultValue: 'none',
    },
    url: Sequelize.STRING,
    callback: Sequelize.STRING,
    keyboardType: {
      type: Sequelize.ENUM('inline', 'reply'),
      defaultValue: 'inline',
    },
    isFullWidth: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    rowOrder: {
      type: Sequelize.INTEGER,
    },
    nextBlockId: { type: Sequelize.INTEGER },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  {
    schema: 'public',
    tableName: 'buttons',
    timestamps: true,
    underscored: true,
  },
);

const ButtonsToBlocks = sequelize.define(
  'ButtonsToBlocks',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    buttonId: Sequelize.INTEGER,
    blockId: Sequelize.INTEGER,
    isFullWidth: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    order: Sequelize.INTEGER,
    rowOrder: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  {
    schema: 'public',
    tableName: 'buttons_to_blocks',
    timestamps: true,
    underscored: true,
  },
);

const ContentButtonTranslations = sequelize.define(
  'ContentButtonTranslations',
  {
    buttonTranslationsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buttonId: {
      type: Sequelize.INTEGER,
    },
    language: {
      type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
      defaultValue: 'ua',
    },
    label: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  {
    schema: 'public',
    tableName: 'button_translations',
    timestamps: true,
    underscored: true,
  },
);

Blocks.hasMany(Blocks, {
  foreignKey: 'parentId',
  as: 'children',
});
Blocks.belongsTo(Blocks, {
  foreignKey: 'parentId',
  as: 'parent',
});

Blocks.hasMany(ContentTranslations, {
  foreignKey: 'blockId',
  as: 'translations',
});
ContentTranslations.belongsTo(Blocks, {
  foreignKey: 'blockId',
  as: 'block',
});

Buttons.hasMany(ContentButtonTranslations, {
  foreignKey: 'buttonId',
  as: 'translations',
});
ContentButtonTranslations.belongsTo(Buttons, {
  foreignKey: 'buttonId',
  as: 'button',
});

ButtonsToBlocks.belongsTo(Buttons, { foreignKey: 'buttonId', as: 'button' });
ButtonsToBlocks.belongsTo(Blocks, { foreignKey: 'blockId', as: 'block' });

Buttons.hasMany(ButtonsToBlocks, {
  foreignKey: 'buttonId',
  as: 'buttonsToBlocks',
});
Blocks.hasMany(ButtonsToBlocks, {
  foreignKey: 'blockId',
  as: 'buttonsToBlocks',
});

Blocks.belongsToMany(Buttons, {
  through: ButtonsToBlocks,
  foreignKey: 'blockId',
  otherKey: 'buttonId',
  as: 'buttons',
});

Buttons.belongsToMany(Blocks, {
  through: ButtonsToBlocks,
  foreignKey: 'buttonId',
  otherKey: 'blockId',
  as: 'blocks',
});

module.exports = {
  Blocks,
  Buttons,
  ContentTranslations,
  ContentButtonTranslations,
  ButtonsToBlocks,
};
