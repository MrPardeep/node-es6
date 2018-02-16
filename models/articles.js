"use strict";

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

const articlesSchema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedOn: { type: Date },
    details: { type: String, required: false }
});

articlesSchema.plugin(uniqueValidator, { message: 'Article already exist !!' });

module.exports = mongoose.model('articles', articlesSchema);