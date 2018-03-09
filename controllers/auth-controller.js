"use strict";

import express from 'express';
import Promise from 'bluebird';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const router = express.Router();

import User from './../models';
import dao from './../dao';
import responseHndlr from './../config/resHandler';
import emailer from '../client/email/index';
import config from './../config';

let userSignup = async(req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired),
        checkForValidEmail = req.email ? config.appUtils.isValidEmail(req.email) : null;

    if (checkForEmptyProps) {
        return responseHndlr.getPropertyMissingMsg();
    }

    if (!checkForValidEmail) {
        return responseHndlr.getInvalidEmailMsg();
    }

    let user = new User.userModel(req);
    let findUser = await dao.basicDao.findEntry(User.userModel, { email: req.email })
    if (!findUser.length) {
        let passwordEncryption = await config.appUtils.passwordEncryption(user)
        if (passwordEncryption) {
            let saveIntoDB = await dao.basicDao.saveEntry(user)
            if (saveIntoDB) {
                return { status: config.constants.STATUS_CODE.created, message: config.constants.RESPONSE_MSGS.SIGNUP_SUCCESS };
            }
        }
    } else {
        return { status: config.constants.STATUS_CODE.error, message: config.constants.RESPONSE_MSGS.EMAIL_EXIST };
    }
}

let login = async(req, res) => {
    let keysRequired = ['email', 'password'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return responseHndlr.getPropertyMissingMsg();
    }

    let isValidEmail = await config.appUtils.isValidEmail(req.email.trim());
    if (!isValidEmail) {
        return responseHndlr.getInvalidEmailMsg();
    }

    let userData = await User.userModel.findOne({ email: req.email.trim() });
    if (userData) {
        let passwordCompare = await config.appUtils.passwordCompare(req.password, userData.password)
        if (passwordCompare) {
            let token = jwt.sign({ email: userData.email, role: userData.role }, config.config.JWT_SECRET, { expiresIn: '1h' });
            let userDetail = {
                email: userData.email || null,
                firstname: userData.firstname || null,
                name: userData.name || null,
                lastname: userData.lastname || null,
                role: userData.role || null
            }
            return { status: config.constants.STATUS_CODE.success, token: token, user: userDetail };
        } else {
            return { status: config.constants.STATUS_CODE.error, message: config.constants.RESPONSE_MSGS.UNAUTHORIZED }
        }
    } else {
        return { status: config.constants.STATUS_CODE.server_error, message: config.constants.RESPONSE_MSGS.USER_NOT_FOUND }
    }
}

let forgotPassword = async(req, res, next) => {
    if (!req.email) {
        return responseHndlr.getPropertyMissingMsg();
    }

    let validateEmail = config.appUtils.isValidEmail(req.email.trim());

    if (!validateEmail) {
        return responseHndlr.getInvalidEmailMsg();
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
                    return { message: config.constants.RESPONSE_MSGS.FORGOT_PWD_SUCCESS }
            }
        } else
            return { message: config.constants.USER_NOT_FOUND };
    } catch (error) {
        return responseHndlr.getServerErrorMsg();
    }
}

let updateProfile = async(req, res, next) => {
    let keysRequired = ['email', 'password'],
        hasEmptyProperties = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (!hasEmptyProperties) {
        return responseHndlr.getPropertyMissingMsg();
    }

    let validateEmail = config.appUtils.isValidEmail(req.email.trim());
    if (!validateEmail) {
        return responseHndlr.getInvalidEmailMsg();
    }

    try {
        let isUserExist = await dao.basicDao.findEntry(User.userModel, { email: req.email.trim() });
        if (isUserExist.length) {
            let table = User.userModel,
                where = { _id: isUserExist[0].id },
                value = {
                    email: req.email.trim(),
                    country: req.country || isUserExist[0].country,
                    firstname: req.firstname || isUserExist[0].firstname,
                    lastname: req.lastname || isUserExist[0].lastname,
                    dob: req.dob || isUserExist[0].dob
                }

            let isUpdated = await dao.basicDao.update(table, where, value);
            if (isUpdated) {
                return { result: config.constants.RESPONSE_MSGS.USER_UPDATED };
            }
        } else {
            return { error: config.constants.RESPONSE_MSGS.USER_NOT_FOUND }
        }
    } catch (err) {
        return responseHndlr.getServerErrorMsg();
    }
}

let resetPassword = async(req, res, next) => {
    if (!req.password && !req.token) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING }
    }

    try {
        let userData = await dao.basicDao.findEntry(User.userModel, { resetPasswordToken: req.token });
        if (userData.length) {
            let encryptedPassword = await config.appUtils.passwordEncryption(req);
            if (encryptedPassword) {
                userData[0].password = encryptedPassword.password;
                userData[0].resetPasswordExpires = null;
                userData[0].resetPasswordToken = null;

                let updatePassword = await userData[0].save();
                if (updatePassword) {
                    return { result: config.constants.RESPONSE_MSGS.CHANGE_PWD_SUCCESS }
                }
            }
        } else {
            return { error: config.constants.RESPONSE_MSGS.USER_NOT_FOUND }
        }
    } catch (err) {
        return responseHndlr.getServerErrorMsg();
    }
}

export default {
    userSignup,
    login,
    forgotPassword,
    updateProfile,
    resetPassword
};