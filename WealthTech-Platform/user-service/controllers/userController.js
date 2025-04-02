const { createUser } = require('../services/userService');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
