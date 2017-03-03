module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    firstname:  DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.ARRAY(DataTypes.FLOAT)
  }, {
    getterMethods: {
      _location() {
        return `(${this.location[0]}, ${this.location[1]})`;
      }
    },
    classMethods: {
      getMap() {
        return this.findAll({})
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
        return this.findAll({});
      }
    }
  });
};
