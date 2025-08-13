const Sequelize = require('sequelize');
const sequelize = require('../config').sequelize;

const Users = sequelize.define(
  'Users',
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    role: {
      type: Sequelize.ENUM(
        'admin',
        'content_manager',
        'marketer',
        'user_bot',
        'user',
      ),
      defaultValue: 'user',
    },
    accessToken: Sequelize.STRING,
    refreshToken: Sequelize.STRING,
    active: { type: Sequelize.BOOLEAN, defaultValue: true },
    language: {
      type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
      defaultValue: 'ua',
    },
    firstStartAt: {
      type: Sequelize.DATE,
      field: 'first_start_at',
    },
    lastWebappOpenAt: {
      type: Sequelize.DATE,
      field: 'last_webapp_open_at',
    },
    telegramId: Sequelize.STRING,
    isAdminPanelUser: { type: Sequelize.BOOLEAN, defaultValue: false },
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

const UsersEvents = sequelize.define(
  'UsersEvents',
  {
    usersEventsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.ENUM(
        'start',
        'webapp_open',
        'click',
        'content_view',
        'lang_change',
        'screen_enter',
        'broadcast_view',
        'error',
        'unknown',
      ),
      defaultValue: 'unknown',
    },
    metadata: Sequelize.JSONB,
    buttonId: {
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
    tableName: 'users_events',
    timestamps: true,
    underscored: true,
  },
);

Users.hasMany(UsersEvents, { foreignKey: 'userId', as: 'events' });
UsersEvents.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

module.exports = { Users, UsersEvents };
