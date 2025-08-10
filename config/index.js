const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
  {
    dialect: 'postgres',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
};
