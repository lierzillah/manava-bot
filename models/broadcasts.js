const Sequelize = require('sequelize');
const sequelize = require('../config').sequelize;

const Broadcasts = sequelize.define(
  'Broadcasts',
  {
    broadcastsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    scheduled_at: Sequelize.STRING,
    intervalCount: { type: Sequelize.INTEGER, defaultValue: 500 },
    intervalDelayMinutes: { type: Sequelize.INTEGER, defaultValue: 5 },
    status: {
      type: Sequelize.ENUM('scheduled', 'sending', 'done', 'failed'),
      defaultValue: 'scheduled',
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
    tableName: 'broadcasts',
    timestamps: true,
    underscored: true,
  },
);

const BroadcastContents = sequelize.define(
  'BroadcastContents',
  {
    broadcast_contents_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    broadcastId: {
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
    buttons: Sequelize.JSONB,
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
    tableName: 'broadcast_contents',
    timestamps: true,
    underscored: true,
  },
);

const BroadcastLogs = sequelize.define(
  'BroadcastLogs',
  {
    broadcastContentsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    broadcastId: {
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
    buttons: Sequelize.JSONB,
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
    tableName: 'broadcast_logs',
    timestamps: true,
    underscored: true,
  },
);

module.exports = { Broadcasts, BroadcastContents, BroadcastLogs };
