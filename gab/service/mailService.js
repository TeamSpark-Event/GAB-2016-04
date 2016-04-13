var configurationService = require('./configurationService');

var sendgrid  = require('sendgrid')(configurationService.smtp.apiKey);

var service = {};

var mailTemplate = {
    registrationConfirm: {
        getSubject: function() {
            return 'Подтверждение регистрации на Global Azure Bootcamp ' + configurationService.gab.year;
        },
        getHtml: function(registrationId) {
            var array = [];
            array.push('<h3>Пожалуйста, пройдите по ссылке для подтверждения регистрации на Global Azure Bootcamp ' + configurationService.gab.year + ':</h3>');
            array.push('<div>');
            array.push('<a href="' + configurationService.web.domain + '/confirm/' + registrationId + '" style="color: #9c0; font-size: 16px;">');
            array.push('ССЫЛКА');
            array.push('</a>');
            array.push('</div>');

            return array.join('');
        },
        getText: function(registrationId) {
            var array = [];
            array.push('Пожалуйста, пройдите по ссылке для подтверждения регистрации на Global Azure Bootcamp ' + configurationService.gab.year + ':');
            array.push(configurationService.web.domain + '/confirm/' + registrationId);

            return array.join('\r\n');
        }
    },
    registrationDone: {
        getSubject: function() {
            return 'Ваша регистрация на Global Azure Bootcamp ' + configurationService.gab.year + ' подтверждена!';
        },
        getHtml: function(name) {
            var array = [];
            array.push('<h3>Спасибо ' + name + ', ваша регистрация на Global Azure Bootcamp ' + configurationService.gab.year + ' успешно подтверждена!</h3>');
            array.push('<div>');
            array.push('<p>');
            array.push('Global Azure Bootcamp ' + configurationService.gab.year + ' состоится 16го апреля 2016 года в г.Киеве по адресу ул.Жилянская 75, офис Microsoft Ukraine. Начало регистрации в 9-00, начало докладов в 10-00.');
            array.push('</p>');
            array.push('<p>');
            array.push('Следите за обновлениями в рассылке или же на нашем <a href="' + configurationService.web.domain + '" style="color: #9c0; font-size: 16px;">сайте</a>.');
            array.push('</p>');
            array.push('</div>');

            return array.join('');
        },
        getText: function(name) {
            var array = [];
            array.push('Спасибо' + name + ', ваша регистрация на Global Azure Bootcamp ' + configurationService.gab.year + ' успешно подтверждена!');
            array.push('Global Azure Bootcamp ' + configurationService.gab.year + ' состоится 16го апреля 2016 года в г.Киеве по адресу ул.Жилянская 75, офис Microsoft Ukraine. Начало регистрации в 9-00, начало докладов в 10-00.');
            array.push('Следите за обновлениями в рассылке или же на нашем сайте: ' + configurationService.web.domain);

            return array.join('\r\n\r\n');
        }
    }
};

service.sendRegistrationConfirmEmail = function(toEmail, toName, registrationId, callback) {
    var email = new sendgrid.Email({
        to: toEmail,
        toname: toName,
        from: configurationService.smtp.fromEmail,
        fromname: configurationService.smtp.fromName,
        subject: mailTemplate.registrationConfirm.getSubject(),
        text: mailTemplate.registrationConfirm.getText(registrationId),
        html: mailTemplate.registrationConfirm.getHtml(registrationId)
    });

    sendgrid.send(email, function(err, json) {
        callback(err, json);
    });
};

service.sendRegistrationDoneEmail = function(toEmail, toName, callback) {
    var email = new sendgrid.Email({
        to: toEmail,
        toname: toName,
        from: configurationService.smtp.fromEmail,
        fromname: configurationService.smtp.fromName,
        subject: mailTemplate.registrationDone.getSubject(),
        text: mailTemplate.registrationDone.getText(toName),
        html: mailTemplate.registrationDone.getHtml(toName)
    });

    sendgrid.send(email, function(err, json) {
        callback(err, json);
    });
};

module.exports = service;