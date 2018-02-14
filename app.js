"use strict";

const express = require('express'),
    mongoose = require('mongoose');

const app = express(),
    config = require('./config');

/* let env = process.env.NODE_ENV;
require('./config/env'); */

mongoose.connect(config.dbManager.DB_CONNECTION_KEY);

/* config.dbManager.connectDB(abc, (error, result) => {
    if (error) {
        console.log(error, 'error connecting to DB');
        return;
    }
}) */

require('./config/express-config')(app);
require('./routes')(app);

module.exports = app;