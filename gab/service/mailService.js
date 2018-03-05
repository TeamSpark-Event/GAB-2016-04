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
            array.push('Global Azure Bootcamp ' + configurationService.gab.year + ' состоится 21го апреля 2018 года в г.Киеве по адресу ул.Жилянская 75, офис Microsoft Ukraine. Начало регистрации в 9-00, начало докладов в 10-00.');
            array.push('</p>');
            array.push('<p>');
            array.push('Следите за обновлениями в рассылке или же на нашем <a href="' + configurationService.web.domain + '" style="color: #9c0; font-size: 16px;">сайте</a>.');
            array.push('</p>');
            array.push('</div>');

            // array.push('<div>');
            // array.push('<h3>Список докладов</h3>');
            // array.push('<h4>Сборка, развертывание и управление релизами в облаке.</h4>');
            // array.push('<p>');
            // array.push('Еще с давних времен было популярно разворачивать свое приложение при помощи разного рода графических инстументов в режиме publish -> next -> next -> finish. Этот подход использовали многие, так как он был простым и понятным. Но у него была и есть одна большая беда - его практически невозможно автоматизировать. Других, более продвинутых инструментов, многие боялись, так как думали, что они сложны в управлении. Во время этого доклада будет развеян этот миф и мы покажем, как меньше чем за час можно настроить сборку приложения в облаке, а также его развертывание на разные окружения, используя при этом простые и понятные инстументы.');
            // array.push('</p>');
            // array.push('<h4>Azure Service Fabric и архитектура микросервисов.</h4>');
            // array.push('<p>');
            // array.push('Традиционный подход к проектированию монолитных приложений по-своему хорош, но у него все же есть недостатки. Монолит очень тяжело масштабировать и не всегда просто понять принцип его работы для новых людей, которые приходят в команду. Альтернативой монолиту есть подход с гордым и романтичным названием - архитектура микросервисов. В рамках доклада мы немного поговорим о самой архитектуре в целом, а также затронем новый фреймворк Service Fabric. Этот фреймворк является открытым, его можно хостить не только в Azure, но именно тут вы получите больше преимуществ от его использования. Service Fabric позволяет мне, как разработчику, сфокусироваться на создании нового кода, а задачи по развертыванию, обеспечению высокой доступности и взаимодействию между собой моих микросервисов уже решены и они не отвлекают меня от главного - создания нового продукта.');
            // array.push('</p>');
            // array.push('<h4>Как разместить надежный и масштабируемый сайт со своим доменным именем в облаке не превышая бюджет в $1?</h4>');
            // array.push('<p>');
            // array.push('Как вы возможно знаете, в облаке Microsoft Azure есть бесплатный хостинг план для веб-сайтов, но он имеет ряд ограничений, таких как 60 минут процессорного времени, 165 МБ траффика в день и отсутствие возможности назначить собственное доменное имя. Есть ли способ обойти эти ограничения? Да, он есть!');
            // array.push('</p>');
            // array.push('<h4>Azure Active Directory - взгляд со стороны безопасности.</h4>');
            // array.push('<p>');
            // array.push('Доклад ориентирован на ознакомление с возможностями Azure Active Directory в области управлении идентификацией в облачных приложениях. Будут рассмотрены сценарии только облачного использования, а также в интеграции с наземным ADDS.');
            // array.push('</p>');
            // array.push('<h4>Эффективное использование технологий облака Azure для разработчиков и бизнеса на примере платформы Onlizer.</h4>');
            // array.push('<p>');
            // array.push('Для современных бизнес-процессов применение облака является несомненным преимуществом. Но при внедрении облачных решений часто возникает много вопросов, связанных с эффективным использованием облачных сервисов и построением правильной архитектуры. В рамках доклада мы расскажем о методиках и лучших практиках использования облачных технологий Microsoft Azure на примере платформы Onlizer и продемонстрируем процесс разработки облачных приложений с ее помощью.');
            // array.push('</p>');
            // array.push('<h4>Проект Agromonitor - решение на базе IoT и Azure для точного мониторинга сельского хозяйства.</h4>');
            // array.push('<p>');
            // array.push('Команда проекта Agromonitor расскажет нам свою историю успеха. Коллеги поделятся опытом использования облачных технологий для упрощения работы аграриев и докажут, что правильное использование технологий помогает экономить.');
            // array.push('</p>');
            // array.push('</div>');

            return array.join('');
        },
        getText: function(name) {
            var array = [];
            array.push('Спасибо' + name + ', ваша регистрация на Global Azure Bootcamp ' + configurationService.gab.year + ' успешно подтверждена!');
            array.push('Global Azure Bootcamp ' + configurationService.gab.year + ' состоится 21го апреля 2018 года в г.Киеве по адресу ул.Жилянская 75, офис Microsoft Ukraine. Начало регистрации в 9-00, начало докладов в 10-00.');
            array.push('Следите за обновлениями в рассылке или же на нашем сайте: ' + configurationService.web.domain);
            // array.push('Список докладов');
            // array.push('* Сборка, развертывание и управление релизами в облаке.');
            // array.push('Еще с давних времен было популярно разворачивать свое приложение при помощи разного рода графических инстументов в режиме publish -> next -> next -> finish. Этот подход использовали многие, так как он был простым и понятным. Но у него была и есть одна большая беда - его практически невозможно автоматизировать. Других, более продвинутых инструментов, многие боялись, так как думали, что они сложны в управлении. Во время этого доклада будет развеян этот миф и мы покажем, как меньше чем за час можно настроить сборку приложения в облаке, а также его развертывание на разные окружения, используя при этом простые и понятные инстументы.');
            // array.push('* Azure Service Fabric и архитектура микросервисов.');
            // array.push('Традиционный подход к проектированию монолитных приложений по-своему хорош, но у него все же есть недостатки. Монолит очень тяжело масштабировать и не всегда просто понять принцип его работы для новых людей, которые приходят в команду. Альтернативой монолиту есть подход с гордым и романтичным названием - архитектура микросервисов. В рамках доклада мы немного поговорим о самой архитектуре в целом, а также затронем новый фреймворк Service Fabric. Этот фреймворк является открытым, его можно хостить не только в Azure, но именно тут вы получите больше преимуществ от его использования. Service Fabric позволяет мне, как разработчику, сфокусироваться на создании нового кода, а задачи по развертыванию, обеспечению высокой доступности и взаимодействию между собой моих микросервисов уже решены и они не отвлекают меня от главного - создания нового продукта.');
            // array.push('* Как разместить надежный и масштабируемый сайт со своим доменным именем в облаке не превышая бюджет в $1?');
            // array.push('Как вы возможно знаете, в облаке Microsoft Azure есть бесплатный хостинг план для веб-сайтов, но он имеет ряд ограничений, таких как 60 минут процессорного времени, 165 МБ траффика в день и отсутствие возможности назначить собственное доменное имя. Есть ли способ обойти эти ограничения? Да, он есть!');
            // array.push('* Azure Active Directory - взгляд со стороны безопасности.');
            // array.push('Доклад ориентирован на ознакомление с возможностями Azure Active Directory в области управлении идентификацией в облачных приложениях. Будут рассмотрены сценарии только облачного использования, а также в интеграции с наземным ADDS.');
            // array.push('* Эффективное использование технологий облака Azure для разработчиков и бизнеса на примере платформы Onlizer.');
            // array.push('Для современных бизнес-процессов применение облака является несомненным преимуществом. Но при внедрении облачных решений часто возникает много вопросов, связанных с эффективным использованием облачных сервисов и построением правильной архитектуры. В рамках доклада мы расскажем о методиках и лучших практиках использования облачных технологий Microsoft Azure на примере платформы Onlizer и продемонстрируем процесс разработки облачных приложений с ее помощью.');
            // array.push('* Проект Agromonitor - решение на базе IoT и Azure для точного мониторинга сельского хозяйства.');
            // array.push('Команда проекта Agromonitor расскажет нам свою историю успеха. Коллеги поделятся опытом использования облачных технологий для упрощения работы аграриев и докажут, что правильное использование технологий помогает экономить.');

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