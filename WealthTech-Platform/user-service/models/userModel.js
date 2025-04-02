const { DataTypes } = require('sequelize');
const db = require('../../config/database');
const { encryptField, decryptField } = require('../../common/utils/encryption');

const User = db.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    client_reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: DataTypes.STRING,
    forename: DataTypes.STRING,
    middlename: DataTypes.STRING,
    surname: DataTypes.STRING,
    previous_surname: DataTypes.STRING,
    country_of_birth: DataTypes.STRING,
    email_address: {
        type: DataTypes.STRING,
    },
    telephone_number: {
        type: DataTypes.STRING,
    },
    date_of_birth: DataTypes.DATE,
    date_of_death: DataTypes.DATE,
    tax_residencies: DataTypes.STRING,
    nationalities: DataTypes.STRING,
    employment_status: DataTypes.STRING,
    industry: DataTypes.STRING,
    sources_of_wealth: DataTypes.STRING,
    annual_income: DataTypes.DECIMAL(15, 2),
    vulnerability_status: DataTypes.STRING,
    vulnerability_reason: DataTypes.STRING,
    vulnerability_duration: DataTypes.STRING
}, {
    tableName: 'users',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

User.beforeFind(async (options) => {
    console.log('before find user');
});

User.afterFind(async (result) => {
    if (result) {
        if (result.email_address) {
            result.email_address = decryptField(result.email_address);
        }
        if (result.telephone_number) {
            result.telephone_number = decryptField(result.telephone_number);
        }
    }
});

User.beforeCreate(async (user, options) => {
    if (user.email_address) {
        user.email_address = encryptField(user.email_address);
    }
    if (user.telephone_number) {
        user.telephone_number = encryptField(user.telephone_number);
    }
});

User.beforeUpdate(async (user, options) => {
    if (user.email_address) {
        user.email_address = encryptField(user.email_address);
    }
    if (user.telephone_number) {
        user.telephone_number = encryptField(user.telephone_number);
    }
});

module.exports = User;
