const { sequelize } = require("./db");
const { Car } = require(".");
const { cars } = require("./seedData");

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdCars = await Car.bulkCreate(cars);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
