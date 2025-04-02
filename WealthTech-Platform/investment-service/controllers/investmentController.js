const { createInvestmentAccount } = require('../services/investmentService');

// Create a new investment account
exports.createInvestmentAccount = async (req, res) => {
    try {
        const { userId, clientReference, accountDetails } = req.body;
        const account = await createInvestmentAccount(userId, clientReference, accountDetails);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
