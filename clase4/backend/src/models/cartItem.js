const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
    cart_item_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    cart_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'carts',  
            key: 'cart_id'   
        }
    },
    product_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'products',  
            key: 'product_id'   
        }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false},
},
{
    schema: 'shopping_carts',
    tableName: 'cart_items',
    timestamps: false    
});

Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });


module.exports = CartItem;
