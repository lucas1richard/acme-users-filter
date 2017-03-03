const sequelize = require('./_conn');
const faker = require('faker');
const Users = sequelize.import('../models/User');

function seed() {
  return sequelize.sync({ force: true }).then(() => {
    let data = [];
    for (let i = 0; i < 100; i++) {
      let name = [faker.name.firstName(), faker.name.lastName()];
      data.push({
        firstname: name[0],
        lastname: name[1],
        email: name.map(nm => nm.toLowerCase()).join('.') + '@example.com',
        location: [ faker.address.latitude(), faker.address.longitude() ]
      });
    }
    return sequelize.models.user.bulkCreate(data);
  });
}

module.exports = {
  models: {
    Users
  },
  seed
};
