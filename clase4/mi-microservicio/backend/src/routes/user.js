const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.login);


module.exports = router;
