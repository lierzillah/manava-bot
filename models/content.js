const Sequelize = require('sequelize');
const sequelize = require('../config').sequelize;

const ContentBlocks = sequelize.define(
  'ContentBlocks',
  {
    contentBlocksId: {
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
    tableName: 'content_blocks',
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

const ContentButtons = sequelize.define(
  'ContentButtons',
  {
    contentButtonsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blockId: {
      type: Sequelize.INTEGER,
    },
    order: Sequelize.INTEGER,
    type: {
      type: Sequelize.ENUM('url', 'callback', 'none'),
      defaultValue: 'none',
    },
    url: Sequelize.STRING,
    callback: Sequelize.STRING,
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
    tableName: 'content_buttons',
    timestamps: true,
    underscored: true,
  },
);

const ContentButtonTranslations = sequelize.define(
  'ContentButtonTranslations',
  {
    contentButtonTranslationsId: {
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
    tableName: 'content_button_translations',
    timestamps: true,
    underscored: true,
  },
);

module.exports = {
  ContentBlocks,
  ContentButtons,
  ContentTranslations,
  ContentButtonTranslations,
};
