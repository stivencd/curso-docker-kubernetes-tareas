const Products = require('../models/product');


async function createProduct(req, res) {
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

async function getProduct(req, res) {

    try {
        const product = await Products.findByPk(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getAllProducts(req, res) {
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

module.exports = {
    createProduct,
    getAllProducts,
    getProduct
}
