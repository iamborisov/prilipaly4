1) Скачать репозиторий:
    
    `git clone git@github.com:iamborisov/prilipaly4.git`

2) Перейти в скачанную папку проекта:
    
    `cd prilipaly4`

3) Использовать composer (https://getcomposer.org/) для установки зависимостей:

    `composer install`

4) Установить базу данных геолокации:

    `bin/console maxmind:geoip:update-data http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz`

5) Создать администратора сайта:

    `bin/console fos:user:create`
    
    `bin/console fos:user:promote` 

    !!! Когда команда :promote спросит роль пользвателя, необходимо написать: `ROLE_ADMIN`

6) Настроить доступ к БД и почтовому серверу, отредактировав файл `.env` в папке проекта (для пример можно использовать `.env.dist`):

    `APP_ENV` - должно быть "prod"
    
    `APP_SECRET` - необходимо поменять на любое значение отличное от дефолтного
    
    `DATABASE_URL` - указать настройки подключения к БД
    
    `MAILER_URL` - указать настройки подключения к почтовому серверу
    
    `MAILER_USER` - имя отправителя для писем
    
    `MAILER_NAME` - почта отправителя для писем

7) Настроить веб-сервер на папку с проектом.

    Инструкция по настройке веб-сервера для Symfony-проектов: https://symfony.com/doc/current/setup/web_server_configuration.html

8) Накатить БД из предоставленного дампа
