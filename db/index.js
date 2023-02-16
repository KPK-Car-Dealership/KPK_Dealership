const { sequelize, Sequelize } = require("./db");
const { Car } = require("./Car");
const { User } = require("./User");
const { Admin } = require("./Admin");

module.exports = {
  Car,
  sequelize,
  Sequelize,
};
