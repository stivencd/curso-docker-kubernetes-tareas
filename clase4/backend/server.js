const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/config/db');
const http = require('http');
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product');
const cartRoutes = require('./src/routes/cart');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/assets', express.static('assets'));
// Rutas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.APP_PORT || 3000;

// Sincronizar tablas y arrancar servidor
sequelize.sync().then(() => {
    console.log('Tablas sincronizadas con PostgreSQL');
    http.createServer(app).listen(PORT);
    console.log('Server running at ' + PORT);
});
