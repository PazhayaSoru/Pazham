// filepath: c:\Users\thede\OneDrive\Desktop\WT Lab\WT miniproject\backend\models\budget_model.js
const { DataTypes } = require('sequelize');
const db = require('../pgDatabase');

const Budget = db.define('budget', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    budget_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    amount_spent:{
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    }
}, {
    timestamps: false  // or true if you want it to auto-manage these fields
});

Budget.associate = models => {
  Budget.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = Budget;