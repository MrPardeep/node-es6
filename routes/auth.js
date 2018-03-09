"use strict";

import express from 'express';
import Promise from 'bluebird';
const router = express.Router();

import controller from './../controllers';
import constants from './../config/constants';
import middleware from './../middlewares';

/* 
    User Signup API
    Requested URL : localhost:3000/auth/signup
    Requested Params : { email, password, country, firstname, lastname, dob, role, phone }
*/
router.post('/signup', async(req, res, next) => {
    let { email, password, country, firstname, lastname, dob, role, phone, } = req.body;

    try {
        let response = await controller.authController.userSignup({ email, password, country, firstname, lastname, dob, role, phone });
        return res.send(response);
    } catch (error) {
        return res.send({ error: error });
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

export default router