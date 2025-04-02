const express = require('express');
const router = express.Router();
const { createInvestmentAccount } = require('../controllers/investmentController');

router.post('/investment-account', createInvestmentAccount);

module.exports = router;
