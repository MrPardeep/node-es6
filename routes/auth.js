"use strict";

const express = require('express'),
    Promise = require('bluebird'),
    router = express.Router();

const controller = require('./../controllers'),
    constants = require('./../config/constants'),
    middleware = require('./../middlewares');

/* 
    User Signup API
    Requested URL : localhost:3000/auth/signup
    Requested Params : { email, password, country, firstname, lastname, dob, role, phone }
*/
router.post('/signup', async(req, res, next) => {
    let { email, password, country, firstname, lastname, dob, role, phone } = req.body;

    try {
        let response = await controller.authController.userSignup({ email, password, country, firstname, lastname, dob, role, phone });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
    }
});

/* 
    User Signup API
    Requested URL : localhost:3000/auth/add-user
    Requested Params : { email, password, country, name, dob, role, phone, status}
*/
router.post('/add-user', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    let { email, password, country, name, dob, role, phone, status } = req.body;

    try {
        let response = await controller.authController.userSignup({ email, password, country, name, dob, role, phone, status });
        return res.send(response);
    } catch (error) {
        return res.status(constants.STATUS_CODE.error).send({ error: error });
    }
});

/* 
    Get user list API
    Requested URL : localhost:3000/auth/user
*/
router.get('/user', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    try {
        let response = await controller.authController.getUserList();
        return res.send(response);
    } catch (error) {
        return res.status(constants.STATUS_CODE.error).send({ error: error });
    }
});

/* 
    Get single user API
    Requested URL : localhost:3000/auth/user/:id
*/
router.get('/user/:id', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    try {
        let response = await controller.authController.getUser(req);
        return res.send(response);
    } catch (error) {
        return res.status(constants.STATUS_CODE.error).send({ error: error });
    }
});


/* 
    Get Manger list API
    Requested URL : localhost:3000/auth/manager
*/
router.get('/manager', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    try {
        let response = await controller.authController.getManagerList(req);
        return res.send(response);
    } catch (error) {
        return res.status(constants.STATUS_CODE.error).send({ error: error });
    }
});


/* 
    User Login API
    Requested URL : localhost:3000/auth/authenticate
    Requested Params : { email, password }
*/
router.post('/login', async(req, res) => {
    let { email, password } = req.body;

    try {
        let response = await controller.authController.login({ email, password });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
    }
});

/* 
    User Forgot Password API
    Requested URL : localhost:3000/auth/forgot-password
    Requested Params : { email }
*/
router.post('/forgot-password', async(req, res) => {
    let { email } = req.body;
    try {
        let response = await controller.authController.forgotPassword({ email });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
    }
});

/* 
    User Update profile API
    Requested URL : localhost:3000/auth/profile-update
    Requested Params : { email, password, country, firstname, lastname, dob }
*/
router.post('/profile-update', middleware.checkAuth.checkValidToken, async(req, res) => {
    let { email, country, firstname, lastname, dob } = req.body;

    try {
        let response = await controller.authController.updateProfile({ email, country, firstname, lastname, dob });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
    }
});

/* 
    User Reset Password API
    Requested URL : localhost:3000/auth/reset-password
    Requested Params : { password, token }
*/
router.post('/reset-password', async(req, res) => {
    let { password, token } = req.body;

    try {
        let response = await controller.authController.resetPassword({ password, token });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
    }
});

module.exports = router;