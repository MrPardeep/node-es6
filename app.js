"use strict";

const express = require('express'),
    mongoose = require('mongoose');

const app = express(),
    config = require('./config');

mongoose.connect(config.dbManager.DB_CLOUD_KEY);

require('./config/express-config')(app);
require('./routes')(app);

module.exports = app;