"use strict";

const express = require('express'),
    router = express.Router(),
    Promise = require('bluebird'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken');

const User = require('./../models'),
    dao = require('./../dao'),
    emailer = require('../client/email/index'),
    config = require('./../config');

let userSignup = (req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired),
        checkForValidEmail = req.email ? config.appUtils.isValidEmail(req.email) : null;

    if (checkForEmptyProps) {
        return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING);
    }

    if (!checkForValidEmail) {
        return Promise.reject(config.constants.RESPONSE_MSGS.INVALID_EMAIL);
    }

    let user = new User.userModel(req);
    return dao.basicDao.findEntry(User.userModel, { email: req.email }).then(userArray => {
        if (userArray.length) {
            return Promise.reject(config.constants.RESPONSE_MSGS.EMAIL_EXIST);
        }

        return config.appUtils.passwordEncryption(user).then(result => {
            return dao.basicDao.saveEntry(user).then(response => {
                return { 'result': config.constants.RESPONSE_MSGS.SIGNUP_SUCCESS };
            });
        });
    })
}

let login = (req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired),
        dataTrim = config.appUtils.trimValues(req);

    if (checkForEmptyProps) {
        return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING);
    }

    return User.userModel.findOne({ email: dataTrim.email }).then((user, err) => {
        if (err) {
            return Promise.reject(config.constants.ERROR_MESSAGES.INTERNAL_SERVER);
        }

        if (!user) {
            return Promise.reject(config.constants.RESPONSE_MSGS.USER_NOT_FOUND);
        }

        return config.appUtils.passwordCompare(req.password, user.password).then(result => {
            if (result) {
                let token = jwt.sign(user, config.config.JWT_SECRET, {
                    expiresIn: 1440 // expires in 1 hour
                });
                return { error: false, token: token };
            }
            return Promise.reject(config.constants.RESPONSE_MSGS.UNAUTHORIZED);
        });
    });
}

let forgotPassword = (req, res, next) => {
    if (!req.email) {
        return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING)
    }

    let validateEmail = config.appUtils.isValidEmail(req.email);

    if (!validateEmail) {
        return Promise.reject(config.constants.RESPONSE_MSGS.INVALID_EMAIL)
    }

    return User.userModel.findOne({ email: req.email }).then((res) => {
        if (res) {
            /* return new Promise((resolve, reject) => {
                crypto.randomBytes(10, (ex, buf) => {
                    let token = buf.toString('hex');
                    console.log(token);
                    return resolve({ data: 'email valid and found', token: token });
                });
            }) */
            emailer.sendEmail(req.email);
            return { data: 'email valid and found' }
        } else
            return { error: config.constants.USER_NOT_FOUND };
    })
}

let resetPassword = (req, res, next) => {
    if (!req.password && !req.token) {
        return Promise.reject(config.constants.RESPONSE_MSGS.FIELDS_MISSING)
    }

    User.userModel.findOne({ resetToken: req.token }).then(res => {

    })
}

module.exports = {
    userSignup,
    login,
    forgotPassword,
    resetPassword
};