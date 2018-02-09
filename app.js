"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    logger = require('morgan');


const app = express(),
    config = require('./config'),
    model = require('./models');

app.use(logger('dev'));

mongoose.connect(config.dbManager.DB_CONNECTION_KEY);
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './media/' }).any());
app.use(express.static('media'));

require('./routes')(app);
module.exports = app;