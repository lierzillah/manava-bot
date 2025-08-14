const {
  getAllBroadcasts,
  getBroadcastById,
  createBroadcast,
  updateBroadcast,
  deleteBroadcast,
} = require('../resolvers/broadcastResolver');

const { checkAccess } = require('../resolvers/usersResolver');
const { tokenValidator, accessErrorMsg } = require('../utils');

const broadcastRoutes = async (app) => {
  app.get('/broadcasts', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager', 'marketer'],
      });

      if (canAccessContent) {
        const broadcasts = await getAllBroadcasts();
        res.json(broadcasts);
      } else {
        accessErrorMsg({ res, roles: 'Admin, Content Manager or Marketer' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/broadcasts/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager', 'marketer'],
      });

      if (canAccessContent) {
        const broadcast = await getBroadcastById({
          broadcastId: req.params.id,
        });
        if (!broadcast) {
          return res.status(404).json({ error: 'Broadcast not found' });
        }
        res.json(broadcast);
      } else {
        accessErrorMsg({ res, roles: 'Admin, Content Manager or Marketer' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.post('/broadcasts', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager', 'marketer'],
      });

      if (canAccessContent) {
        const broadcast = await createBroadcast(req.body);
        res.json(broadcast);
      } else {
        accessErrorMsg({ res, roles: 'Admin, Content Manager or Marketer' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.put('/broadcasts/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager', 'marketer'],
      });

      if (canAccessContent) {
        const updated = await updateBroadcast({
          broadcastId: req.params.id,
          ...req.body,
        });
        res.json(updated);
      } else {
        accessErrorMsg({ res, roles: 'Admin, Content Manager or Marketer' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.delete('/broadcasts/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccessContent = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager', 'marketer'],
      });

      if (canAccessContent) {
        const result = await deleteBroadcast({ broadcastId: req.params.id });
        res.json(result);
      } else {
        accessErrorMsg({ res, roles: 'Admin, Content Manager or Marketer' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};

module.exports = { broadcastRoutes };
