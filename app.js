"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    cors = require('cors'),
    logger = require('morgan');


const app = express(),
    config = require('./config'),
    model = require('./models');

app.use(logger('dev'));

mongoose.connect(config.dbManager.DB_CLOUD_KEY);
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './media/' }).any());
app.use(express.static('media'));

// app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
require('./routes')(app);

module.exports = app;