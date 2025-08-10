const {
  logIn,
  getUser,
  createUser,
  updateUser,
  getUsers,
  checkUserAccessToken,
} = require('../resolvers/usersResolver');
const { tokenValidator, updateAccessToken } = require('../utils');

const userRoutes = async (app) => {
  app.post('/auth/login', async (req, res) => {
    try {
      const user = await logIn(req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.post('/auth/refresh-token', tokenValidator('jwt'), async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const refreshToken = authHeader && authHeader.split(' ')[1];
      const { accessToken, userId } = await updateAccessToken(refreshToken);
      await updateUserAccessToken(userId, accessToken);
      res.json({ accessToken });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/user', tokenValidator('jwt'), async (req, res) => {
    try {
      const user = await getUser(req.userId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/check-access-token', tokenValidator('jwt'), async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const accessToken = authHeader && authHeader.split(' ')[1];
      const user = await checkUserAccessToken({ accessToken });
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/user/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const user = await getUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/users', tokenValidator('jwt'), async (req, res) => {
    try {
      const { isAdminPanelUser = false } = req.query;

      const user = await getUsers({ isAdminPanelUser });
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.post('/user', async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.put('/user/:id', async (req, res) => {
    try {
      const user = await updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  });
};

module.exports = {
  userRoutes,
};
