const moment = require('moment');
const sequelize = require('../../config').sequelize;

const { Op } = require('sequelize');
const { Users, UsersEvents } = require('../../models');

const getUserActivityStatistic = async () => {
  const baseCondition = { active: true };

  const [allUsers, allAdminUsers, telegramUsers] = await Promise.all([
    Users.count({ where: baseCondition }),
    Users.count({ where: { ...baseCondition, isAdminPanelUser: true } }),
    Users.count({ where: { ...baseCondition, isAdminPanelUser: false } }),
  ]);

  return { allUsers, allAdminUsers, telegramUsers };
};

const getStatisticCount = async ({
  type,
  dau,
  wau,
  mau,
  isButtonsStats = false,
}) => {
  if (!type) {
      return {
        status: 403,
        error: `Type is required for statistic`,
      };
  }

  const where = { type };

  if (dau) {
    where.createdAt = {
      [Op.gte]: moment().startOf('day').toDate(),
    };
  } else if (wau) {
    where.createdAt = {
      [Op.gte]: moment().startOf('week').toDate(),
    };
  } else if (mau) {
    where.createdAt = {
      [Op.gte]: moment().startOf('month').toDate(),
    };
  }

  if (isButtonsStats) {
    return UsersEvents.findAndCountAll({ where }); //+ buttons model
  }

return UsersEvents.findAndCountAll({
  where,
  include: [
    { 
        attributes: [
        'userId',
        'username',
        'email',
        'language',
        'firstStartAt',
        'lastWebappOpenAt',
        'telegramId',
        'isAdminPanelUser',
        'role',
        'active',
  ],
      model: Users, 
      as: 'user' }
  ]
});
};

const getFullStatistics = async () => {
  const totalUsers = await Users.count({
    distinct: true,
    col: 'telegramId',
  });

  const botStarts = await UsersEvents.count({
    where: { type: 'start' },
  });

  const webAppStarts = await UsersEvents.count({
    where: { type: 'webapp_open' },
  });

  const topButtons = await UsersEvents.findAll({
    where: { type: 'click' },
    attributes: [
      'button_id',
      [sequelize.fn('COUNT', sequelize.col('button_id')), 'clicks'],
    ],
    group: ['button_id'],
    order: [[sequelize.literal('clicks'), 'DESC']],
    limit: 10,
  });

  const dau = await UsersEvents.count({
    distinct: true,
    col: 'userId',
    where: {
      createdAt: {
        [Op.gte]: moment().startOf('day').toDate(),
      },
    },
  });

  const wau = await UsersEvents.count({
    distinct: true,
    col: 'userId',
    where: {
      createdAt: {
        [Op.gte]: moment().startOf('week').toDate(),
      },
    },
  });

  const mau = await UsersEvents.count({
    distinct: true,
    col: 'userId',
    where: {
      createdAt: {
        [Op.gte]: moment().startOf('month').toDate(),
      },
    },
  });

  return {
    totalUsers,
    botStarts,
    webAppStarts,
    topButtons,
    dau,
    wau,
    mau,
  };
};

const logStatistic = async ({ userId, type, metadata, buttonId }) => {
  return UsersEvents.create({
    userId,
    type,
    metadata,
    buttonId,
  });
};

module.exports = {
  getFullStatistics,
  getStatisticCount,
  getUserActivityStatistic,
  logStatistic,
};
