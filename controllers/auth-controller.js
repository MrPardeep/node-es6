"use strict";

const express = require('express'),
    router = express.Router(),
    Promise = require('bluebird'),
    jwt = require('jsonwebtoken');

const User = require('./../models'),
    dao = require('./../dao'),
    config = require('./../config');

let userSignup = (req, res) => {
    let keysRequired = ['email', 'password', 'dob', 'firstname', 'lastname'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired),
        checkForValidEmail = req.email ? config.appUtils.isValidEmail(req.email) : null;

    if (!checkForEmptyProps) {
        if (checkForValidEmail) {
            let user = new User.userModel(req);
            return dao.basicDao.findEntry(User.userModel, { email: req.email }).then(userArray => {
                if (userArray.length) {
                    return Promise.reject(config.constants.RESPONSE_MSGS.EMAIL_EXIST);
                }

                return config.appUtils.passwordEncryption(user).then(result => {
                    return dao.basicDao.saveEntry(user).then(response => {
                        return { 'data': response };
                    });
                });
            })
        } else {
            return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING);
        }
    } else {
        return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING);
    }
}

let login = (req, res) => {
    let dataTrim = config.appUtils.trimValues(req);
    console.log(req, dataTrim);
    User.userModel.findOne({ email: req.email }).lean().exec((err, user) => {
        if (err) {
            return res.json({ error: true });
        }
        if (!user) {
            return res.status(404).json({ 'message': 'User not found!' });
        }
        let token = jwt.sign(user, config.config.JWT_SECRET, {
            expiresIn: 1440 // expires in 1 hour
        });
        res.json({ error: false, token: token });
    });
}

module.exports = {
    userSignup,
    login
};