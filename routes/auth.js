"use strict";

const express = require('express'),
    Promise = require('bluebird'),
    router = express.Router();

const controller = require('./../controllers');

/* 
    User Signup API
    Requested URL : localhost:3000/auth/signup
    Requested Params : { email, password, country, firstname, lastname, dob }
*/
router.post('/signup', (req, res, next) => {
    let { email, password, country, firstname, lastname, dob } = req.body;
    controller.authController.userSignup({ email, password, country, firstname, lastname, dob })
        .then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send({ 'error': err });
        })
});

/* 
    User Login API
    Requested URL : localhost:3000/auth/authenticate
    Requested Params : { email, password }
*/
router.post('/login', (req, res) => {
    let { email, password } = req.body;

    controller.authController.login({ email, password })
        .then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send({ "error": err });
        })
});

/* 
    User Forgot Password API
    Requested URL : localhost:3000/auth/forgot-password
    Requested Params : { email }
*/
router.post('/forgot-password', (req, res) => {
    let { email } = req.body;

    controller.authController.forgotPassword({ email })
        .then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send({ "error": err });
        })
});

/* 
    User Reset Password API
    Requested URL : localhost:3000/auth/reset-password
    Requested Params : { password, token }
*/
router.post('/reset-password', (req, res) => {
    let { password, token } = req.body;

    controller.authController.resetPassword({ password, token })
        .then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send({ "error": err });
        })
});

module.exports = router;