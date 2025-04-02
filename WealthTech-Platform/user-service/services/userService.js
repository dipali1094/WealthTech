const User = require('../models/userModel');

// Business logic to create a user
exports.createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
};
