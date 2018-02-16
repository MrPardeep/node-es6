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

let userSignup = async(req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired),
        checkForValidEmail = req.email ? config.appUtils.isValidEmail(req.email) : null;

    if (checkForEmptyProps) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING };
    }

    if (!checkForValidEmail) {
        return { error: config.constants.RESPONSE_MSGS.INVALID_EMAIL };
    }

    let user = new User.userModel(req);
    let findUser = await dao.basicDao.findEntry(User.userModel, { email: req.email })
    if (!findUser.length) {
        let passwordEncryption = await config.appUtils.passwordEncryption(user)
        if (passwordEncryption) {
            let saveIntoDB = await dao.basicDao.saveEntry(user)
            if (saveIntoDB) {
                return { 'result': config.constants.RESPONSE_MSGS.SIGNUP_SUCCESS };
            }
        }
    } else {
        return { error: config.constants.RESPONSE_MSGS.EMAIL_EXIST };
    }
}

let login = async(req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING };
    }

    let isValidEmail = await config.appUtils.isValidEmail(req.email.trim());
    if (!isValidEmail) {
        return { error: config.constants.RESPONSE_MSGS.INVALID_EMAIL };
    }

    let findUser = await User.userModel.findOne({ email: req.email.trim() });
    if (findUser) {
        let passwordCompare = config.appUtils.passwordCompare(req.password, findUser.password)
        if (passwordCompare) {
            let token = jwt.sign({ email: findUser.email, firstname: findUser.firstname }, config.config.JWT_SECRET, { expiresIn: '1h' });
            return { error: false, token: token };
        } else {
            return { error: config.constants.RESPONSE_MSGS.UNAUTHORIZED }
        }
    } else {
        return { error: config.constants.RESPONSE_MSGS.USER_NOT_FOUND }
    }
}

let forgotPassword = async(req, res, next) => {
    if (!req.email) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING }
    }

    let validateEmail = config.appUtils.isValidEmail(req.email.trim());

    if (!validateEmail) {
        return { error: config.constants.RESPONSE_MSGS.INVALID_EMAIL }
    }
    try {
        let findUser = await User.userModel.findOne({ email: req.email.trim() })
        if (findUser) {
            let radomString = await crypto.randomBytes(10);
            if (radomString) {
                let emailerOptions = {
                    to: req.email,
                    token: radomString.toString('hex')
                }
                findUser.resetPasswordExpires = Date.now() + 3600000;
                findUser.resetPasswordToken = emailerOptions.token;

                let userModelSave = await findUser.save();
                let emailSentConfirmation = await emailer.sendEmail(emailerOptions);
                if (emailSentConfirmation && userModelSave)
                    return { result: config.constants.RESPONSE_MSGS.FORGOT_PWD_SUCCESS }
            }
        } else
            return { error: config.constants.USER_NOT_FOUND };
    } catch (error) {
        return { error: error };
    }
}

let resetPassword = async(req, res, next) => {
    if (!req.password && !req.token) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING }
    }

    try {
        let getUser = await dao.basicDao.findEntry(User.userModel, { resetPasswordToken: req.token });
        if (getUser.length) {
            let encryptedPassword = await config.appUtils.passwordEncryption(req);
            if (encryptedPassword) {
                getUser[0].password = encryptedPassword.password;
                getUser[0].resetPasswordExpires = null;
                getUser[0].resetPasswordToken = null;

                let updatePassword = await getUser[0].save();
                if (updatePassword) {
                    return { result: config.constants.RESPONSE_MSGS.CHANGE_PWD_SUCCESS }
                }
            }
        } else {
            return { error: config.constants.RESPONSE_MSGS.USER_NOT_FOUND }
        }
    } catch (err) {
        return { error: err }
    }
}

module.exports = {
    userSignup,
    login,
    forgotPassword,
    resetPassword
};