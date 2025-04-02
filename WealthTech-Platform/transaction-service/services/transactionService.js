const Transaction = require('../models/transactionModel');

// Business logic to create a transaction record
exports.createTransaction = async (transactionData) => {
    try {
        const transaction = await Transaction.create(transactionData);
        return transaction;
    } catch (error) {
        throw new Error('Error creating transaction');
    }
};
