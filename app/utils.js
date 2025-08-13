const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { System } = require('../models');

const checkApiToken = async (authHeader) => {
  const token = authHeader && authHeader.split(' ')[1];
  const { value } = await System.findOne({ where: { key: 'api_token' } });
  return token === value;
};

const checkJwtToken = (authHeader) => {
  try {
    const token = authHeader && authHeader.split(' ')[1];

    const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET);

    return { status: 200, response: { userId } };
  } catch (error) {
    return { status: 404, response: error };
  }
};

const updateJwtToken = (userId) => {
  return {
    refreshToken: jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    }),
    accessToken: jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    }),
  };
};

const updateAccessToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        reject('Invalid or expired refresh token');
        return;
      }
      const accessToken = jwt.sign(
        { userId: user.userId },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' },
      );
      resolve({ accessToken, userId: user.userId });
    });
  });
};

const generateReferenceCode = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  while (code.length < 6) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    code += randomChar;
  }

  return code;
};

const generateApiToken = async () => {
  const apiToken = await System.findOne({ where: { key: 'api_token' } });
  if (!apiToken) throw new Error('API token not found.');

  const lastUpdated = moment(apiToken.updatedAt);

  if (moment().diff(lastUpdated, 'days') >= 7) {
    const value = crypto.randomBytes(32).toString('hex');
    await apiToken.update({ value });
    return value;
  }

  return apiToken.value;
};

function tokenValidator(tokenType) {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let isValid = false;

    try {
      if (tokenType === 'api') {
        isValid = await checkApiToken(authHeader);
        if (!isValid) {
          return res.status(404).json({
            error: `${tokenType} token is not valid`,
          });
        }
      } else if (tokenType === 'jwt') {
        if (authHeader) {
          const { status, response } = await checkJwtToken(authHeader);

          if (status === 200 && response.userId) {
            req.userId = response.userId;
            isValid = true;
          }

          if (status === 404) {
            isValid = false;
          }
        }

        if (!isValid) {
          return res.status(404).json({
            error: `${tokenType} token is not valid`,
          });
        }
      }

      next();
    } catch (error) {
      console.error('Error validating token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const encryptPassword = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

const decryptPassword = (text, hashedText) => {
  return encryptPassword(text) === hashedText;
};

const accessErrorMsg = ({ res, roles = 'Admin' }) => {
  return res.status(403).json({
    error: `Access denied. You need the role of ${roles} to view this content.`,
  });
};

module.exports = {
  tokenValidator,
  updateJwtToken,
  updateAccessToken,
  generateReferenceCode,
  generateRandomString,
  generateApiToken,
  encryptPassword,
  decryptPassword,
  accessErrorMsg,
};
