const { DataTypes } = require('sequelize');
const db = require('../../config/database');
const datdecryptAES256 = require('../../common/utils/encryption');

// Define Compliance model
const ComplianceLog = db.define('ComplianceLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    log_type: DataTypes.STRING,
    log_details: DataTypes.STRING, 
    response_id: DataTypes.STRING, 
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: DataTypes.DATE
}, {
    tableName: 'compliance_logs',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

// Columns that need to be decrypted
const columnsToDecrypt = ['log_type', 'log_details', 'response_id'];

ComplianceLog.afterFind(async (value) => {
    if (value) {
        await Promise.all(columnsToDecrypt.map(async (key) => {
            if (value[key]) {
                try {
                    const data = await datdecryptAES256.decryptField(value[key]);
                    value[key] = data.decryptedData;
                } catch (error) {
                }
            }
            return '';
        }));
    }
});

module.exports = ComplianceLog;
