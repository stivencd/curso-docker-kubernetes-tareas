const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        dialect: 'postgres',
        logging: false,
        define: {
            schema: 'shopping_carts'
        }
    }
);

module.exports = sequelize;
