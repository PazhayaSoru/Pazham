const Sequelize = require('sequelize');
const db = require('../pgDatabase');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoincrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  montly_income:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
{
  timestamps: false, 
  tableName: 'users', 
});

User.associate = models => {
  User.hasMany(models.Transaction, { foreignKey: 'user_id' });
  User.hasMany(models.Budget, { foreignKey: 'user_id' });
};

module.exports = User;