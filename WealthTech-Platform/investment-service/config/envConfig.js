const environConfig = {
    development: {
        Investment_Account_Url: 'https://api.sandbox.wealthkernel.io/accounts',
    },
    qa:{},
    staging: {},
    preprod: {},
    production: {
    }
}

const environment = process.env.NODE_ENV || 'development';
const config = environConfig[environment];

module.exports = config;