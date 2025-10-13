const Products = require('../models/product');
const redisClient = require('../middleware/redisClient');
const sequelize = require('../models/product').sequelize;
async function create(req, res) {
    const { name, description, price, stock, image } = req.body;

    try {
        const product = await Products.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            image_url: image
        });

        res.status(201).json(product);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
};

async function get(req, res) {

    try {
        const product = await Products.findByPk(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getAll(req, res) {
    try {
        const product = await Products.findAll({
            attributes: [
                ['product_id', 'productId'],  // Alias user_id as id
                'name',
                'description',
                'price',
                'stock',
                ['image_url', 'imageUrl']
            ]
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function update(req, res) {
    try {
        const productId = req.params.id;
        const updates = req.body; 

        const product = await Products.findByPk(productId);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const t = await sequelize.transaction();
        await product.update(updates);
        await t.commit();
        // Invalidar cache del producto y lista
        await redisClient.del('products:all');
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
    getAll,
    get,
    update
}
