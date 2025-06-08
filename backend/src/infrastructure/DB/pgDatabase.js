const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres",
  "postgres",
  "AadhDep@7", {
    host: "localhost",
    dialect: 'postgres'
  });


  module.exports = sequelize;