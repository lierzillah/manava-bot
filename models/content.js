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
    tableName: 'buttons',
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

Blocks.hasMany(Buttons, {
  foreignKey: 'blockId',
  as: 'buttons',
});
Buttons.belongsTo(Blocks, {
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

module.exports = {
  Blocks,
  Buttons,
  ContentTranslations,
  ContentButtonTranslations,
};
