var nconf = require('nconf');

nconf
    .argv()
    .env()
    .defaults({
        'STORAGE_ACCOUNT_NAME' : '',
        'STORAGE_ACCOUNT_KEY' : '',
        'SMTP_API_KEY' : '',
        'SMTP_FROM_EMAIL' : '',
        'SMTP_FROM_NAME' : '',
        'GAB_YEAR' : 0,
        'WEB_DOMAIN' : ''
    });

var service = {};

service.storage = {
    accountName: nconf.get('STORAGE_ACCOUNT_NAME'),
    accountKey: nconf.get('STORAGE_ACCOUNT_KEY')
};

service.smtp = {
    apiKey: nconf.get('SMTP_API_KEY'),
    fromEmail: nconf.get('SMTP_FROM_EMAIL'),
    fromName: nconf.get('SMTP_FROM_NAME')
};

service.gab = {
    year: nconf.get('GAB_YEAR')
};

service.web = {
    domain: nconf.get('WEB_DOMAIN')
};

module.exports = service;