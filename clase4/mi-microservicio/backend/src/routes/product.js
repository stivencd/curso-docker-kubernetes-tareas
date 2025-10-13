const express = require('express');
const cacheMiddleware = require('./../middleware/cache');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/', productController.create);
router.get('/:id', productController.get);
router.get('/', cacheMiddleware('products'), productController.getAll);
router.patch('/:id', productController.update);



module.exports = router;
