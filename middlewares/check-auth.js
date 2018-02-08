"use strict";

const jwt = require('jsonwebtoken'),
    config = require('./../config/config');

let checkValidToken = (req, res, next) => {
    let token = req.body.token || req.headers['token'] || req.query.token;

    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.json({ "error": err });
            }
            req.decode = decode;
            next();
        });
    } else {
        return res.status(403).send({
            "error": 'User is not authorized'
        })
    }
}

module.exports = {
    checkValidToken
}