"use strict";

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

const projectsSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    department: { type: String },
    manager: { type: String },
    type: { type: String },
    code: { type: String },
    startDate: { type: Date },
    estEndDate: { type: Date },
    actualEndDate: { type: Date },
    currency: { type: Number },
    allowedHours: { type: Number },
    price: { type: Number },
    status: { type: Boolean }
});

projectsSchema.plugin(uniqueValidator, { message: 'Project already exist !!' });

module.exports = mongoose.model('projects', projectsSchema);