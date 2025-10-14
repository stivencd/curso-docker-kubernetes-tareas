const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

router.delete('/', cacheController.clear);
router.get('/stats', cacheController.stats);

module.exports = router;
