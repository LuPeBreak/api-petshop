const Sequelize = require("sequelize");

const sqlize = new Sequelize(
  'petshop',
  'root',
  '224466',
  {
    host:'127.0.0.1',
    dialect:'mysql'
  }
);

module.exports = sqlize;
