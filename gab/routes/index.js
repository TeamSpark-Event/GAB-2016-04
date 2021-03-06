var express = require('express');
var router = express.Router();

var configurationService = require('./../service/configurationService');

var uuid = require('uuid');
var entityGenerator = require('azure-storage').TableUtilities.entityGenerator;
var dataService = require('./../service/dataService');
var mailService = require('./../service/mailService');

router.get('/', function(req, res, next) {
    var model = {
      event_desc_title: 'ОПИСАНИЕ',
      event_desc: '<p><span class="myGreenNotice">GAB</span> - это однодневный глобальный тренинг, посвящённый Azure, организатором которого выступает мировое облачное сообщество.</p> <p>Первоначально данное событие было создано пятью Microsoft Azure MVP для того, чтобы поддержать местные облачные сообщества и научить всех желающих базовым навыкам работы с облачными технологиями Microsoft. <br /> Несмотря на то, что данное событие поддерживается компанией Microsoft и другими спонсорами, оно является независимым событием и организовывается исключительно местными сообществами.<br /> В Киеве Global Azure Bootcamp организовывается силами Ukrainian Microsoft Azure Community.</p><p>В 2015 году Global Azure Bootcamp проходил в один день в 182 локациях в 64 странах,  включая такие страны как Непал и остров Маврикий. Общее количество людей, которые посетили Global Azure Bootcamp в 2015 году - более 5000 человек. Наверное, это самое большое ИТ мероприятие в мире, организованное сообществом.<br />Традиционно на Global Azure Bootcamp проходят благотворительные лабораторные работы, например, в 2015 году лабораторная работа была посвящена исследованиям в области рака.</p><p>В этом году также планируется выполнение лабораторной работы, которая будет использовать распределенные вычислительные мощности участников Global Azure Bootcamp. Тема и спецификации лабораторной работы 2016 года будут оглашены позднее.</p><p><span class="myGreenNotice">Где и когда </span><br />В Киеве Global Azure Bootcamp пройдет 16 апреля 2016 года, по адресу: город Киев, улица Жилянская 75, офис Microsoft Украина.<br />Начало регистрации в 9:00, начало докладов в 10:00. Предусматривается перерыв на обед.<br />Обратите внимание! Для того, чтобы посетить Global Azure Bootcamp, Вам необходимо иметь при себе удостоверение личности.</p><p><span class="myGreenNotice">Цель Global Azure Bootcamp</span> - помочь техническим сообществам и разработчикам получить базовые знания Microsoft Azure просто потому что это хороший продукт и мы хотим, чтобы больше людей во всем мире пользовались облачными продуктами Microsoft.</p><p>Мы верим, что Global Azure Bootcamp поможет как новичкам, так и опытным профессионалам получить информационную поддержку, необходимую для того, чтобы успешно разрабатывать и выкладывать приложения в облако, а также что данное мероприятие поможет укрепить украинское облачное сообщество.</p><p><span style="font-style: italic;">With the Global Azure Bootcamp we can show Microsoft, as well as the market, which power hides behind communities in an impressive way. Even for global players like Microsoft itself it would not be easy to organize such an event by themselves. The community made it. As for me the unique thing about it is there is no money involved. Speakers receive no compensation, registration is free of charge, there are simply people that are so passionate about a certain technology, to share their knowledge with others. Anybody - same if pupil, student or professional software developer - should be able to benefit from it.</span><br /><span style="font-weight: bold;"> Rainer Stropek, MVP and local event organizer</span></p>',
      slots_title: 'СПИСОК ДОКЛАДОВ',
      slots: [
          {title: 'Сборка, развертывание и управление релизами в облаке.', desc: 'Еще с давних времен было популярно разворачивать свое приложение при помощи разного рода графических инстументов в режиме publish -> next -> next -> finish. Этот подход использовали многие, так как он был простым и понятным. Но у него была и есть одна большая беда - его практически невозможно автоматизировать. Других, более продвинутых инструментов, многие боялись, так как думали, что они сложны в управлении. Во время этого доклада будет развеян этот миф и мы покажем, как меньше чем за час можно настроить сборку приложения в облаке, а также его развертывание на разные окружения, используя при этом простые и понятные инстументы.'},
          {title: 'Azure Service Fabric и архитектура микросервисов.', desc: 'Традиционный подход к проектированию монолитных приложений по-своему хорош, но у него все же есть недостатки. Монолит очень тяжело масштабировать и не всегда просто понять принцип его работы для новых людей, которые приходят в команду. Альтернативой монолиту есть подход с гордым и романтичным названием - архитектура микросервисов. В рамках доклада мы немного поговорим о самой архитектуре в целом, а также затронем новый фреймворк Service Fabric. Этот фреймворк является открытым, его можно хостить не только в Azure, но именно тут вы получите больше преимуществ от его использования. Service Fabric позволяет мне, как разработчику, сфокусироваться на создании нового кода, а задачи по развертыванию, обеспечению высокой доступности и взаимодействию между собой моих микросервисов уже решены и они не отвлекают меня от главного - создания нового продукта.'},
          {title: 'Как разместить надежный и масштабируемый сайт со своим доменным именем в облаке не превышая бюджет в $1?', desc: 'Как вы возможно знаете, в облаке Microsoft Azure есть бесплатный хостинг план для веб-сайтов, но он имеет ряд ограничений, таких как 60 минут процессорного времени, 165 МБ траффика в день и отсутствие возможности назначить собственное доменное имя. Есть ли способ обойти эти ограничения? Да, он есть!'},
          {title: 'Azure Active Directory - взгляд со стороны безопасности.', desc: 'Доклад ориентирован на ознакомление с возможностями Azure Active Directory в области управлении идентификацией в облачных приложениях. Будут рассмотрены сценарии только облачного использования, а также в интеграции с наземным ADDS.'},
          {title: 'Эффективное использование технологий облака Azure для разработчиков и бизнеса на примере платформы Onlizer.', desc: 'Для современных бизнес-процессов применение облака является несомненным преимуществом. Но при внедрении облачных решений часто возникает много вопросов, связанных с эффективным использованием облачных сервисов и построением правильной архитектуры. В рамках доклада мы расскажем о методиках и лучших практиках использования облачных технологий Microsoft Azure на примере платформы Onlizer и продемонстрируем процесс разработки облачных приложений с ее помощью.'},
          {title: 'Проект Agromonitor - решение на базе IoT и Azure для точного мониторинга сельского хозяйства.', desc: 'Команда проекта Agromonitor расскажет нам свою историю успеха. Коллеги поделятся опытом использования облачных технологий для упрощения работы аграриев и докажут, что правильное использование технологий помогает экономить.'}
      ],
      location_title: 'ЛОКАЦИЯ',
      location_text: 'г.Киев, ул.Жилянская 75, Бизнес-центр “Евразия”, Microsoft Ukraine',
      location_text_after: '<div class="myGreenNotice">Обратите внимание! </div> <div>На конференцию вам необходимо будет взять с собой документ, подтверждающий личность.</div>',
      // location_map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.120271577851!2d30.498835119011176!3d50.43886038308958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cef1dad747f1%3A0x520c319cb361053e!2sZhylianska+St%2C+75%2C+Kyiv%2C+Ukraine!5e0!3m2!1sen!2s!4v1459013320376',
      partners_title: 'ПАРТНЕРЫ',
      partners: [
          {title: 'Microsoft Ukraine', img: '/images/ms_logo.jpg', text: 'Заснована в 1975 році корпорація Microsoft є визнаним світовим лідером у галузі розробки програмного забезпечення, а також у наданні послуг та рішень, які допомагають людям та компаніям повністю реалізувати свій потенціал. З 2003 року в Україні працює компанія «Майкрософт Україна», до завдань якої входить розвиток ринку програмного забезпечення, а також впровадження і локалізація новітніх технологій на території Україні. Додаткову інформацію про компанію та продукти Microsoft можна знайти на веб-сайті Microsoft www.microsoft.ua.'},
          {title: 'IT Community', img: '/images/it_logo.jpg', text: 'Проект «ИТ сообщество Украины» основан в начале 2014 года c целью создания ресурса, на котором ИТ-специалисты разного уровня смогут получить актуальную информацию о различных продуктах, а также особенностях их конфигурирования. На данный момент сообщество поддерживается усилиями 10-ти авторов, которые представляют различные направления информационных технологий. Это дает возможность проекту охватить много направлений, что в конечном итоге будет более интересно читателю.'}
      ]
    };

    model.partials = {
        modal: '_modal'
    };

    res.render ( 'index', model
  );
});

//router.get('/confirm/:registrationId', function(req, res, next) {
//    var model = {
//        isError: false,
//        errorMessage: ''
//    };
//
//    var registrationId = req.params.registrationId;
//
//    if (!!registrationId) {
//        dataService.table.getTableEntities(dataService.table.tableNames.gabRegistration, configurationService.gab.year, registrationId, null, function(errorGet, responseGet) {
//            if (!!errorGet) {
//                model.isError = true;
//                model.errorMessage = 'Произошла ошибка. Обратитесь к организаторам конференции для подтверждения вашей регистрации.';
//
//                res.render ('confirm', model);
//            } else {
//                var results = responseGet.entries;
//                if (!Array.isArray(results) || results.length == 0) {
//                    model.isError = true;
//                    model.errorMessage = 'Произошла ошибка. Мы не смогли найти вашу заявку на участие в нашей базе. Обратитесь к организаторам конференции для подтверждения вашей регистрации.';
//
//                    res.render ('confirm', model);
//                } else {
//                    var entityRegistration = results[0];
//                    entityRegistration.IsConfirmed._ = true;
//
//                    var userEmail = entityRegistration.EMail._;
//                    var userName = entityRegistration.Name._;
//
//                    dataService.table.replaceTableEntity(dataService.table.tableNames.gabRegistration, entityRegistration, function(errorReplace, resultReplace, responseReplace){
//                        if (!!errorReplace) {
//                            model.isError = true;
//                            model.errorMessage = 'Произошла ошибка. Мы не смогли подтвердить вашу заявку на участие. Обратитесь к организаторам конференции для подтверждения вашей регистрации.';
//
//                            res.render ('confirm', model);
//                        } else {
//                            mailService.sendRegistrationDoneEmail(userEmail, userName, function(errorSend, resposeSend) {
//                                if (!!errorSend) {
//                                    model.isError = true;
//                                    model.errorMessage = 'Произошла ошибка. Мы не смогли отправить вам письмо с подтверждением регистрации. Обратитесь к организаторам конференции для подтверждения вашей регистрации.';
//
//                                    res.render ('confirm', model);
//                                } else {
//                                    res.render ('confirm', model);
//                                }
//                            });
//                        }
//                    });
//                }
//            }
//        });
//    } else {
//        model.isError = true;
//        model.errorMessage = 'Произошла ошибка. Мы не смогли найти вашу заявку на участие в нашей базе. Обратитесь к организаторам конференции для подтверждения вашей регистрации.';
//
//        res.render ('confirm', model);
//    }
//});
//
//router.post('/register', function(req, res, next) {
//    var content = req.body;
//
//    var userName = content.name;
//    var userEmail = content.email;
//    var registrationId = uuid.v4().toLowerCase();
//
//    var entityRegistration = {
//        PartitionKey: entityGenerator.String(configurationService.gab.year.toString()),
//        RowKey: entityGenerator.String(registrationId),
//        Name: entityGenerator.String(userName),
//        EMail: entityGenerator.String(userEmail),
//        IsConfirmed: entityGenerator.Boolean(false)
//    };
//
//    var apiResponse = {
//        isError: false,
//        errorMessage: ''
//    };
//
//    dataService.table.insertTableEntity(dataService.table.tableNames.gabRegistration, entityRegistration, function(error, result, response){
//        if (error) {
//            apiResponse.isError = true;
//            apiResponse.errorMessage = 'Произошла ошибка во время добавления вашей заявки на участие в конференции. Попробуйте заполнить форму еще раз или свяжитесь с организаторами конференции.';
//
//            res.send(apiResponse);
//        } else {
//            mailService.sendRegistrationConfirmEmail(userEmail, userName, registrationId, function(error, response) {
//                console.log(error);
//                console.log(response);
//
//                if (error) {
//                    apiResponse.isError = true;
//                    apiResponse.errorMessage = 'Произошла ошибка во время отправки письма с подтверждением регистрации на вашу почту. Пожалуйста свяжитесь с организаторами конференции для подтверждения вашего участия.';
//
//                    res.send(apiResponse);
//                } else {
//                    res.send(apiResponse);
//                }
//            });
//        }
//    });
//});

module.exports = router;