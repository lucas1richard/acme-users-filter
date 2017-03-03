const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://localhost/users_filter', { logging: false });
