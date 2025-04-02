const { logComplianceEvent } = require('../services/complianceService');

// Log a compliance event
exports.logComplianceEvent = async (req, res) => {
    try {
        const complianceData = req.body;
        await logComplianceEvent(complianceData);
        res.status(201).json({ message: 'Compliance log created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
