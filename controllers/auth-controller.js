"use strict";

const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    User = require('./../models'),
    appUtils = require('./../config/appUtils'),
    config = require('./../config/config');

let userSignup = (req, res) => {
    let keysRequired = ['email', 'password', 'dob', 'firstname', 'lastname']
    if (!appUtils.hasEmptyProperties(req, keysRequired)) {
        let user = new User.userModel(req);
        user.save((err, data) => {
            if (err) {
                return res.json({ 'error': err });
            }
            return res.status(201).json({ 'data': data });
        });
    } else {
        return res.json({ 'error': 'Required fields are missing' });
    }
}

let login = (req, res) => {
    User.userModel.findOne(req).lean().exec((err, user) => {
        if (err) {
            return res.json({ error: true });
        }
        if (!user) {
            return res.status(404).json({ 'message': 'User not found!' });
        }
        let token = jwt.sign(user, config.JWT_SECRET, {
            expiresIn: 1440 // expires in 1 hour
        });
        res.json({ error: false, token: token });
    });
}

module.exports = {
    userSignup,
    login
};