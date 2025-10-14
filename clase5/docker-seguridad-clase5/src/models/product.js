const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Product = sequelize.define('products', {
    product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull:true }
},
{
    schema: 'shopping_carts',
    tableName: 'products',
    timestamps: false    
});

module.exports = Product;
