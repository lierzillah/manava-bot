const {
  getAllBlocks,
  createContentBlock,
  getContentBlockById,
  updateContentBlock,
  deleteContentBlock,
  getAllButtons,
  createTranslationForBlock,
  getContentButtonById,
  createContentButton,
  updateContentButton,
  deleteContentButton,
} = require('../resolvers/contentResolver');

const { checkAccess } = require('../resolvers/usersResolver');
const { tokenValidator, accessErrorMsg } = require('../utils');

const contentRoutes = async (app, upload) => {
  app.get('/content-blocks', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccess = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });
      if (!canAccess) return accessErrorMsg({ res, roles: 'Content Manager' });
      const blocks = await getAllBlocks();
      res.json(blocks);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/content/block/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccess = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });
      if (!canAccess) return accessErrorMsg({ res, roles: 'Content Manager' });
      const block = await getContentBlockById({ blockId: req.params.id });
      res.json(block);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.get('/content/button/:id', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccess = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });
      if (!canAccess) return accessErrorMsg({ res, roles: 'Content Manager' });
      const button = await getContentButtonById({ buttonId: req.params.id });
      res.json(button);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.post('/content/block', tokenValidator('jwt'), async (req, res) => {
    try {
      const canAccess = await checkAccess({
        userId: req.userId,
        allowedRoles: ['content_manager'],
      });
      if (!canAccess) return accessErrorMsg({ res, roles: 'Content Manager' });
      const contentBlock = await createContentBlock(req.body, res);
      res.json(contentBlock);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.put(
    '/content/block/:blockId',
    tokenValidator('jwt'),
    async (req, res) => {
      try {
        const canAccess = await checkAccess({
          userId: req.userId,
          allowedRoles: ['content_manager'],
        });
        if (!canAccess)
          return accessErrorMsg({ res, roles: 'Content Manager' });
        const updatedBlock = await updateContentBlock({
          blockId: req.params.blockId,
          req,
          res,
        });
        res.json(updatedBlock);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
  );

  app.delete(
    '/content/block/:blockId',
    tokenValidator('jwt'),
    async (req, res) => {
      try {
        const canAccess = await checkAccess({
          userId: req.userId,
          allowedRoles: ['content_manager'],
        });
        if (!canAccess)
          return accessErrorMsg({ res, roles: 'Content Manager' });
        const deleted = await deleteContentBlock({
          blockId: req.params.blockId,
        });
        res.json(deleted);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
  );

  app.post('/content/button', async (req, res) => {
    try {
      // const canAccess = await checkAccess({
      //   userId: req.userId,
      //   allowedRoles: ['content_manager'],
      // });
      // if (!canAccess) return accessErrorMsg({ res, roles: 'Content Manager' });
      const button = await createContentButton(req, res);
      res.json(button);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  app.put(
    '/content/button/:buttonId',
    // tokenValidator('jwt'),
    async (req, res) => {
      try {
        // const canAccess = await checkAccess({
        //   userId: req.userId,
        //   allowedRoles: ['content_manager'],
        // });
        // if (!canAccess)
        //   return accessErrorMsg({ res, roles: 'Content Manager' });
        const updatedButton = await updateContentButton({
          ...req.body,
          buttonId: req.params.buttonId,
        });
        res.json(updatedButton);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
  );

  app.delete(
    '/content/button/:buttonId',
    tokenValidator('jwt'),
    async (req, res) => {
      try {
        const canAccess = await checkAccess({
          userId: req.userId,
          allowedRoles: ['content_manager'],
        });
        if (!canAccess)
          return accessErrorMsg({ res, roles: 'Content Manager' });
        const deleted = await deleteContentButton({
          buttonId: req.params.buttonId,
        });
        res.json(deleted);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
  );

  app.post(
    '/content/block/translation/:blockId/:lang',
    tokenValidator('jwt'),
    upload.single('mediaFile'),
    async (req, res) => {
      try {
        const result = await createTranslationForBlock({
          blockId: req.params.blockId,
          lang: req.params.lang,
          args: req.body,
          file: req.file,
          res,
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );
};

module.exports = {
  contentRoutes,
};
