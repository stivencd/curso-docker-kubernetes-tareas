const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const CartItem = require('./cartItem');

const Cart = sequelize.define('Carts', {
    cart_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,  autoIncrement: true  },
    user_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'users',  
            key: 'user_id'   
        }
    },
    status: { type: DataTypes.STRING, allowNull: false },
},
{
    schema: 'shopping_carts',
    tableName: 'carts',
    timestamps: false    
});

User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
// CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });


Cart.hasMany(CartItem, {foreignKey: 'cart_id'});
CartItem.belongsTo(Cart, {foreignKey: 'cart_id'});

module.exports = Cart;
