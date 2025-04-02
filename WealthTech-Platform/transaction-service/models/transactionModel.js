const { DataTypes } = require('sequelize');
const db = require('../../config/database');
const { encryptField, decryptField } = require('../../common/utils/encryption'); 

const Transaction = db.define('Transaction', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    portfolio_id: DataTypes.STRING,
    isin: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    price_currency: DataTypes.STRING,
    price_amount: DataTypes.DECIMAL(15, 2),
    quantity: DataTypes.DECIMAL(15, 2),
    consideration_currency: DataTypes.STRING,
    consideration_amount: {
        type: DataTypes.DECIMAL(15, 2),
    },
    charges_currency: DataTypes.STRING,
    charges_amount: {
        type: DataTypes.DECIMAL(15, 2),
    },
    date: DataTypes.DATE,
    timestamp: DataTypes.TIMESTAMP,
    settled_on: DataTypes.DATE,
    updated_at: DataTypes.TIMESTAMP,
    book_cost: DataTypes.DECIMAL(15, 2),
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'transactions',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

Transaction.beforeFind(async (options) => {
    console.log('before find transaction');
});

Transaction.afterFind(async (result) => {
    if (result) {
        if (result.consideration_amount) {
            result.consideration_amount = decryptField(result.consideration_amount);
        }
        if (result.charges_amount) {
            result.charges_amount = decryptField(result.charges_amount);
        }
    }
});
Transaction.beforeCreate(async (transaction, options) => {
    if (transaction.consideration_amount) {
        transaction.consideration_amount = encryptField(transaction.consideration_amount.toString());
    }
    if (transaction.charges_amount) {
        transaction.charges_amount = encryptField(transaction.charges_amount.toString());
    }
});
Transaction.beforeUpdate(async (transaction, options) => {
    if (transaction.consideration_amount) {
        transaction.consideration_amount = encryptField(transaction.consideration_amount.toString());
    }
    if (transaction.charges_amount) {
        transaction.charges_amount = encryptField(transaction.charges_amount.toString());
    }
});

module.exports = Transaction;
