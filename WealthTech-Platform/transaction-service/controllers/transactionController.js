const { createTransaction } = require('../services/transactionService');

// Create a new transaction (buy, sell, deposit)
exports.createTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const transaction = await createTransaction(transactionData);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
