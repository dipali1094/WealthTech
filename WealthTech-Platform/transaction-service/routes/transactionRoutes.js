const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');

router.post('/transaction', createTransaction);

module.exports = router;
// This code defines an Express router for handling transaction-related routes.