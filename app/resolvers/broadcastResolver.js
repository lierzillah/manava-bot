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

const updateBroadcast = async ({ broadcastId, ...data }) => {
  await Broadcasts.update(data, { where: { broadcastId } });
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
