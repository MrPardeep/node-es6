"use strict";

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    key: { type: Number, unique: true }
});

const departmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    key: { type: Number, unique: true }
});

roleSchema.plugin(uniqueValidator, { message: 'Role already exist !!' });
departmentSchema.plugin(uniqueValidator, { message: 'Deparment already exist !!' });

module.exports = {
    role: mongoose.model('role', roleSchema),
    department: mongoose.model('department', departmentSchema),
}