const { DataTypes } = require('sequelize');
const db = require('../../config/database');
const { decryptField, encryptField } = require('../../common/utils/encryption');

const InvestmentAccount = db.define('InvestmentAccount', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    client_reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    currency: DataTypes.STRING,
    added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: DataTypes.DATE
});

User.afterFind(async (result) => {
    if (result) {
        if (result.name) {
            result.name = decryptField(result.name);
        }
        if (result.type) {
            result.type = decryptField(result.type);
        }
        if (result.currency) {
            result.currency = decryptField(result.currency);
        }
    }
});

User.beforeCreate(async (user, options) => {

    if (user.name) {
        user.name = encryptField(user.name);
    }
    if (user.type) {
        user.type = encryptField(user.type);
    }
    if (user.currency) {
        user.currency = encryptField(user.currency);
    }
});


module.exports = InvestmentAccount;
