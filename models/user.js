"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false, default: 'User' },
    country: { type: String, required: false, default: 'india' }
}));

module.exports = User;