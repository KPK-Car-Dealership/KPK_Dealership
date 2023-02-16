const {sequelize} = require('./db');
const seed = require('./seedFn.js');

seed()
  .then(() => {
    console.log('Seeding success!');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
  