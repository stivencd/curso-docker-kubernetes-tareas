
const User = require('../models/user');


async function createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name: name,
            email: email,
            password_hash: password
        });

        res.status(201).json(user);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {email: req.body.email, password_hash: req.body.password},
            attributes: [
                ['user_id', 'userId'],
                'name',
                'email'
            ]
        });
        if(!user) {
            return res.status(401).send('Unauthorized');
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    login
}
