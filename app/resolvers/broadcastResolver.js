const { BroadcastContents, Broadcasts } = require('../../models');

const getAllBroadcasts = async () => {
  const statusSuccess = await Broadcasts.count({ where: { status: 'done' } });
  const statusError = await Broadcasts.count({ where: { status: 'failed' } });

  const allBroadcasts = await Broadcasts.findAll({
    include: [{ model: BroadcastContents, as: 'contents' }],
    order: [['createdAt', 'DESC']],
  });

  return { statusSuccess, statusError, allBroadcasts };
};

const getBroadcastById = async ({ broadcastId }) => {
  return Broadcasts.findOne({
    where: { broadcastId },
    include: [{ model: BroadcastContents, as: 'contents' }],
  });
};

const createBroadcast = async (args) => {
  const broadcast = await Broadcasts.create(args);
  await BroadcastContents.create({
    ...args,
    broadcastId: broadcast.broadcastId,
  });
  return getBroadcastById({ broadcastId: broadcast.broadcastId });
};

const updateBroadcast = async ({ broadcastId, data, file }) => {
  const broadcast = await Broadcasts.findOne({ where: { broadcastId } });
  if (!broadcast) throw new Error(`Broadcast with ID ${broadcastId} not found`);

  let mediaUrl = broadcast.mediaUrl;

  if (file) {
    if (mediaUrl) {
      const oldFilePath = path.join(process.cwd(), mediaUrl.replace(/^\/+/, ''));
      try {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (err) {
        console.error('Error deleting old file:', err);
      }
    }
    mediaUrl = `/uploads/broadcasts/${file.filename}`;
  }

  await Broadcasts.update(
    { ...data, mediaUrl },
    { where: { broadcastId } }
  );

  return getBroadcastById({ broadcastId });
};

const deleteBroadcast = async ({ broadcastId }) => {
  await BroadcastContents.destroy({ where: { broadcastId: broadcastId } });
  await Broadcasts.destroy({ where: { broadcastId } });
  return { success: true };
};

module.exports = {
  getAllBroadcasts,
  getBroadcastById,
  createBroadcast,
  updateBroadcast,
  deleteBroadcast,
};
