"use strict";

const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

const User = require('./../models'),
    appUtils = require('./../config/appUtils'),
    config = require('./../config/config'),
    saltRounds = 10;

let userSignup = (req, res) => {
    let keysRequired = ['email', 'password', 'dob', 'firstname', 'lastname']
    if (!appUtils.hasEmptyProperties(req, keysRequired)) {
        _passwordEncryption(req);
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

let _passwordEncryption = (req) => {
    console.log(req.password);
    let btoaPassword = atob(req.password);
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(btoaPassword, salt, (err, hash) => {
            req.password = hash;
            return req;
        });
    });
}