const express = require('express');
const router = express.Router();
const { logComplianceEvent } = require('../controllers/complianceController');

router.post('/compliance-log', logComplianceEvent);

module.exports = router;
