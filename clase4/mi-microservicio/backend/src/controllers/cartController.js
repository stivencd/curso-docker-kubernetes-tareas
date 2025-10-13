const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');


async function addToCart(req, res){

    try {
        const { userId, productId, quantity, cartId } = req.body;

        const product = await Product.findOne({
            where: { product_id: productId }
        });

        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        if (quantity > product.stock) return res.status(400).json({ error: 'Stock insuficiente' });

        if(!cartId) {
            const cart = await Cart.create({
                user_id: userId,
                status: 'active'
            });

            const cartItem = await CartItem.create({
                cart_id: cart.cart_id,  
                product_id: product.product_id,  
                quantity,
                price: product.price,
                status: 'active' 

            });
            
            res.status(201).json({ cartItem });
        } else {
            const cartItem = await CartItem.create({
                cart_id: cartId,  
                product_id: product.product_id,  
                quantity,
                price: product.price,
                status: 'active' 
            });

            res.status(201).json({ cartItem });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getCart(req, res){
    try {
        const cart = await Cart.findOne({
            attributes: [
                ['cart_id', 'cartId'],  // Alias user_id as id
                ['user_id', 'userId'],
                'status',
            ],
            where: { user_id: req.params.userId, status: 'active'},
            include: {
                model: CartItem,
                where: { status: 'active' },
                required:true,
                attributes: {exclude: ['cart_item_id', 'cart_id', 'product_id']},
                include: [{
                    model: Product,
                    attributes: [
                        ['product_id', 'productId'],
                        'name',
                        'price',
                        'stock',
                        'description',
                        ['image_url', 'imageUrl'],

                    ],
                }]
            }
        });

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getCart(req, res){
    try {
        const cart = await Cart.findOne({
            attributes: [
                ['cart_id', 'cartId'],  // Alias user_id as id
                ['user_id', 'userId'],
                'status',
            ],
            where: { user_id: req.params.userId, status: 'active'},
            include: {
                model: CartItem,
                where: { status: 'active' },
                required:true,
                attributes: {exclude: ['cart_item_id', 'cart_id', 'product_id']},
                include: [{
                    model: Product,
                    attributes: [
                        ['product_id', 'productId'],
                        'name',
                        'price',
                        'stock',
                        'description',
                        ['image_url', 'imageUrl'],

                    ],
                }]
            }
        });

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function removeCartItem(req, res ){
    try {
        if (!req.body.cartId || !req.body.productId) {
            return res.status(400).json({ error: 'cartId and productId are required' });
        }
        const [updated] = await CartItem.update(
            { status: 'inactive' },
            {
                where: { cart_id: req.body.cartId, product_id: req.body.productId },
            }
        );

        if (updated) {
            console.log(`CartItem status updated successfully`);
            res.status(201).json({ message: 'CartItem status updated' });
        } else {
            console.log(`CartItem not found`);
            res.status(404).json({ message: 'CartItem not found' });
        }
    } catch (error) {
        console.error('Error updating CartItem status:', error);
        res.status(400).json({ message: 'Error updating CartItem status'});
    }
}

module.exports = {
    addToCart,
    getCart, 
    removeCartItem
}