"use strict";

const express = require('express'),
    Promise = require('bluebird'),
    router = express.Router();

const controller = require('./../controllers');

/* 
    User Signup API
    Requested URL : localhost:3000/auth/signup
    Requested Params : { email, password, country, name }
*/
router.post('/signup', (req, res, next) => {
    let { email, password, country, firstname, lastname, dob } = req.body;
    controller.authController.userSignup({ email, password, country, firstname, lastname, dob }, res)
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

    controller.authController.login({ email, password }, res);
});

module.exports = router;