const axios = require('axios');
const InvestmentAccount = require('../models/investmentModel');
const config = require('../config/envConfig');

// Create investment account by calling WealthKernel API and storing the account details
exports.createInvestmentAccount = async (userId, clientReference, accountDetails) => {
    const url = config.Investment_Account_URL;
    const headers = {
        'Accept-Version': '2021-05-17',
        'Idempotency-Key': generateIdempotencyKey(),
    };

    const body = {
        clientReference: clientReference,
        name: accountDetails.name,
        type: accountDetails.type,
        currency: accountDetails.currency,
        productId: accountDetails.productId,
        owner: userId,
    };

    try {
        const response = await axios.post(url, body, { headers });
        if (response.status === 200) {
            await storeInvestmentAccount(response.data.id, clientReference, accountDetails);
            return response.data;
        } else {
            throw new Error('Error creating investment account');
        }
    } catch (error) {
        throw new Error('API Error: ' + error.message);
    }
};

// Helper function to store investment account in DB
const storeInvestmentAccount = async (accountId, clientReference, accountDetails) => {
    try {
        await InvestmentAccount.create({
            id: accountId,
            client_reference: clientReference,
            name: accountDetails.name,
            type: accountDetails.type,
            status: 'Pending',
            currency: accountDetails.currency
        });
    } catch (error) {
        throw new Error('Error storing investment account in DB');
    }
};

// Helper function to generate an idempotency key
function generateIdempotencyKey() {
    return `idempotency-key-${Date.now()}`;
}
