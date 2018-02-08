"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jsonWebToken = require('jsonwebtoken'),
    logger = require('morgan');


const app = express(),
    config = require('./config/config'),
    model = require('./models');

app.use(logger('dev'));

mongoose.connect("mongodb://localhost/test");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);
module.exports = app;