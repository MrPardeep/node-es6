"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import device from 'express-device';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import logger from 'morgan';

import appUtils from './app-utils';
const app = express();

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