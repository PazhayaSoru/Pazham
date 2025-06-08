const { DataTypes } = require('sequelize');
const db = require('../pgDatabase');  



const Transaction = db.define('transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  
},
{
  timestamps: false  
});

Transaction.associate = models => {
  Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
};

module.exports = Transaction;