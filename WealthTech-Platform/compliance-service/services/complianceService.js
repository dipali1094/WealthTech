const ComplianceLog = require('../models/complianceModel');

exports.logComplianceEvent = async (complianceData) => {
    try {
        await ComplianceLog.create(complianceData);
    } catch (error) {
        throw new Error('Error logging compliance event');
    }
};
