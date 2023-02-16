const { Sequelize, sequelize } = require("./db");

const Car = sequelize.define("car", {
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  year: Sequelize.INTEGER,
  mileage: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
});

module.exports = { Car };
