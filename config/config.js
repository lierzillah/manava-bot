const dotenv = require('dotenv');
dotenv.config();

const {
  USERNAME: username,
  PASSWORD: password,
  DATABASE: database,
  HOST: host,
} = process.env;

module.exports = {
  development: {
    username,
    password,
    database,
    host: host || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username,
    password,
    database,
    host: host || 'db',
    dialect: 'postgres',
  },
};
