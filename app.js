"use strict";

import express from 'express';
import mongoose from 'mongoose';

import config from './config';
const app = express();

mongoose.connect(config.dbManager.DB_CONNECTION_KEY_HRM);

// require('./config/express-config')(app);
// require('./routes')(app);
import expressConfig from './config/express-config';
const expressConfigInstance = expressConfig(app);

import route from './routes';
const routeInstance = route(app);

module.exports = app