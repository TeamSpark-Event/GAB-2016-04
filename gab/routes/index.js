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
      event_desc: '<p>25 апреля 2015 года мы организовываем Global Windows Azure Bootcamp в Киеве. Участие в нем бесплатное, но обязательна регистрация. Так что я попрошу всех заполнить короткую форму внизу страницы.</p> <p>Основная идея данного мероприятия - собрать людей, который уже имеют опыт Windows Azure и поговорить на тему разных сценариев использования облачной платформы Microsoft. Мы расскажем какие задачи можно решать при помощи Windows Azure, с какими трудностями можно столкнуться и как их преодолеть. Также мы поделимся сториями из жизни существующих Windows Azure проектов, расскажем как они развиваются. В общем - приходите, будет очень интересно.</p>',
      slots_title: 'СПИСОК ДОКЛАДОВ',
      slots: [
          {title: 'Дизайн сессия. Обсуждения архитектурных решений для Azure проектов.', desc: 'Во время этой темы мы поговорим о том, как можно изменить, или построить заново, архитектуру нашего приложения для получения максимум выгоды от использования разных Azure сервисов. Часто бывает так, что тот или иной сервис выглядит немного скучновато с первого раза, но, если копнуть глубже, или смиксовать его с другим серсисом, то можно добиться поразительных результатов.'},
          {title: '2 title', desc: '2 desc'},
          {title: '3 title', desc: '3 desc'},
          {title: '4 title', desc: '4 desc'}
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

router.post('/register', function(req, res, next) {
    var content = req.body;

    var userName = content.name;
    var userEmail = content.email;
    var registrationId = uuid.v4().toLowerCase();

    var entityRegistration = {
        PartitionKey: entityGenerator.String(configurationService.gab.year.toString()),
        RowKey: entityGenerator.String(registrationId),
        Name: entityGenerator.String(userName),
        EMail: entityGenerator.String(userEmail),
        IsConfirmed: entityGenerator.Boolean(false)
    };

    var apiResponse = {
        isError: false,
        errorMessage: ''
    };

    dataService.table.insertTableEntity(dataService.table.tableNames.gabRegistration, entityRegistration, function(error, result, response){
        if (error) {
            apiResponse.isError = true;
            apiResponse.errorMessage = 'Произошла ошибка во время добавления вашей заявки на участие в конференции. Попробуйте заполнить форму еще раз или свяжитесь с организаторами конференции.';

            res.send(apiResponse);
        } else {
        }
    });
});

module.exports = router;