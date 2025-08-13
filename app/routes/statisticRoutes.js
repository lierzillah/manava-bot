const {
  getFullStatistics,
  getStatisticCount,
  getUserActivityStatistic,
  logStatistic,
} = require('../resolvers/statisticResolver');

const { checkAccess } = require('../resolvers/usersResolver');
const { tokenValidator, accessErrorMsg } = require('../utils');

const statisticRoutes = async (app) => {
  app.get('/statistic/activity', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });

      if (canAccessContent) {
        const statistic = await getUserActivityStatistic();
        res.json(statistic);
      } else {
        accessErrorMsg({ res, roles: 'Admin or Content Manager' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/statistic', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });

      if (canAccessContent) {
        const { type, dau, wau, mau } = req.query;
        const statistic = await getStatisticCount({ type, dau, mau, wau });
        res.json(statistic);
      } else {
        accessErrorMsg({ res, roles: 'Admin or Content Manager' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/statistic/users', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });

      if (canAccessContent) {
        const { type, dau, wau, mau } = req.query;
        const statistic = await getFullStatistics({ type, dau, mau, wau });
        res.json(statistic);
      } else {
        accessErrorMsg({ res, roles: 'Admin or Content Manager' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/statistic/buttons', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });

      if (canAccessContent) {
        const { type, dau, wau, mau } = req.query;
        const statistic = await getStatisticCount({
          type,
          dau,
          mau,
          wau,
          isButtonsStats: true,
        });
        res.json(statistic);
      } else {
        accessErrorMsg({ res, roles: 'Admin or Content Manager' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.post('/statistic', async (req, res) => {
    try {
      const statistic = await logStatistic(req.body);
      res.json(statistic);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};

module.exports = {
  statisticRoutes,
};
