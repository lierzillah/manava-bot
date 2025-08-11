const { Op } = require('sequelize');
const { Users } = require('../../models');
const {
  updateJwtToken,
  encryptPassword,
  decryptPassword,
} = require('../utils');

const logIn = async (args) => {
  try {
    const { username, password } = args;
    const conditions = [];

    if (username) conditions.push({ username });

    let user = null;

    if (conditions.length) {
      user = await Users.findOne({
        where: {
          [Op.or]: conditions,
        },
      });
    }

    if (user && password) {
      const isValidPassword = await decryptPassword(password, user.password);
      if (isValidPassword) {
        const { accessToken, refreshToken } = updateJwtToken(user.userId);
        await user.update({ accessToken, refreshToken });

        return getUser(user.userId);
      } else {
        return {
          status: 404,
          error: `Password for ${user.username} is not correct`,
        };
      }
    }

    return { status: 404, error: 'User not found' };
  } catch (error) {
    return { status: 500, error };
  }
};

async function signUp(args) {
  try {
    const { username, password } = args;

    const isAlreadyCreated = await Users.findOne({
      where: {
        username,
      },
    });

    if (!isAlreadyCreated) return { status: 400, error: `User with ${isAlreadyCreated.username} is already registered` };
    
    const [user] = await Users.create(args);
    const encryptedPassword = encryptPassword(password);
    const { accessToken, refreshToken } = updateJwtToken(user.userId);

    await user.update({ accessToken, refreshToken, password: encryptedPassword });
    return getUser(user.userId);

  } catch (error) {
    return { status: 404, error };
  }
}

const getUser = async (userId) => {
  const user = await Users.findOne({ where: { userId } });
  if (!user) {
    return { status: 404, error: 'User not found' };
  }
  return user;
};

const getUsers = ({ isAdminPanelUser = false }) => {
  if (telegramUsers) {
    return Users.findAll({
      attributes: ['userId', 'username', 'email', 'language', 'firstStartAt', 'lastWebappOpenAt', 'telegramId', 'isAdminPanelUser', 'role', 'active'],
      where: {
        isAdminPanelUser
      }
    })
  }
};

const createUser = async (args) => {
  const conditions = [];

  if (args.username) conditions.push({ username: args.username });

  if (conditions.length) {
    const existing = await Users.findOne({ where: { [Op.or]: conditions } });
    if (existing) {
      return {
        status: 404,
        error: `User with this username already exists'`,
      };
    }
  }

  const hashedPassword = encryptPassword(args.password);

  const user = await Users.create({
    ...args,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = updateJwtToken(user.userId);
  await user.update({ accessToken, refreshToken });

  return user;
};

const updateUser = async (userId, args) => {
  const user = await Users.findOne({ where: { userId } });
  if (!user) throw new Error('User not found');

  if (args.password) {
    args.password = encryptPassword(args.password);
  }

  await user.update(args);
  return user;
};

const checkUserAccessToken = async ({ accessToken }) => {
  const user = await Users.findOne({
    where: {
      accessToken,
    },
  });

  if (!user) return { status: 400, error: `Access token not valid` };
  return { status: 200 };
};

const checkAccess = async ({ userId, allowedRoles }) => {
  const user = await Users.findOne({
    where: { userId },
  });

  if (!user) return false;
  if (user.role === 'admin') return true;

  return allowedRoles.includes(user.role);
};

module.exports = {
  logIn,
  signUp,
  getUser,
  createUser,
  updateUser,
  getUsers,
  checkUserAccessToken,
  checkAccess
};
