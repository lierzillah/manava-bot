const Sequelize = require('sequelize');
const sequelize = require('../../config').sequelize;

const System = sequelize.define(
  'System',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    schema: 'public',
    tableName: 'system_table',
    timestamps: true,
    underscored: true,
  },
);

module.exports = {
  System,
};
