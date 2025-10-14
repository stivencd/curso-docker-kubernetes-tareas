const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.put('/', cartController.removeCartItem);

module.exports = router;
