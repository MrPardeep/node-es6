const express = require('express'),
    router = express.Router();

const controller = require('./../controllers');

/* 
    User Signup API
    Requested URL : localhost:3000/auth/signup
    Requested Params : { email, password, country, name }
*/
router.post('/signup', (req, res, next) => {
    let { email, password, country, name } = req.body;

    controller.authController.userSignup({ email, password, country, name }, res);
});

/* 
    User Login API
    Requested URL : localhost:3000/auth/authenticate
    Requested Params : { email, password }
*/
router.post('/authenticate', (req, res) => {
    let { email, password } = req.body;

    controller.authController.login({ email, password }, res);
});

module.exports = router;