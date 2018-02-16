"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    device = require('express-device'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    logger = require('morgan');

const app = express(),
    appUtils = require('./app-utils');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(device.capture());
    app.use(bodyParser.json({ limit: '50MB' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(multer({ dest: './media/' }).any());
    app.use(express.static('media'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use((req, res, next) => {
        appUtils.setCorsHeader(res)
        next();
    });
}