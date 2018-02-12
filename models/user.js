"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    country: { type: String, required: false, default: 'india' },
    dob: { type: String, required: true }
}));

module.exports = User;