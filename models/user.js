"use strict";

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: false, default: 'user' },
    lastname: { type: String, required: false },
    country: { type: String, required: false, default: 'india' },
    dob: { type: String, required: false }
});

UserSchema.plugin(uniqueValidator, { message: 'User already exist !!' });

module.exports = mongoose.model('User', UserSchema);