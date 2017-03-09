const faker = require('faker');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    firstname:  DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.ARRAY(DataTypes.FLOAT)
  }, {
    getterMethods: {
      location() {
        return `(${this.getDataValue('location')[0]}, ${this.getDataValue('location')[1]})`;
      }
    },
    classMethods: {
      getMap() {
        return this.findAll()
          .then(allusers => allusers.reduce((map, user) => {
              let fl = user.lastname.charAt(0);
              map[fl] = map[fl] ? ++map[fl] : 1;
              return map;
            }, {}))
          .then(map => Object.keys(map).sort().map(key => {
            return { letter: key, number: map[key] };
          }));
      },
      getByLetter(letter) {
        if (letter) return this.findAll({ where: {lastname: {$like: `${letter}%`}}});
        return this.findAll({ order: ['lastname', 'firstname'] });
      },
      regenerateUsers() {
        return this.truncate()
          .then(() => {
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
          return this.bulkCreate(data);
        });
      }
    }
  });
};
