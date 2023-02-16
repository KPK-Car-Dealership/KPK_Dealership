const {sequelize} = require('./db');
const {User} = require('./');
const {Car} = require('./');
const {users, cars} = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdCars = await Car.bulkCreate(cars);
    for(let i=0; i<createdCars.length; ++i){
        let car = createdCars[i];
        const userId = createdUsers[i % 3].id;
        await car.setUser(userId);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
