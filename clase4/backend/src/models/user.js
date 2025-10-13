const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false    }
},
{
    schema: 'shopping_carts',
    tableName: 'users',
    timestamps: false    
});

module.exports = User;
