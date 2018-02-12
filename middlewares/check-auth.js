"use strict";

const jwt = require('jsonwebtoken'),
    config = require('./../config');

let checkValidToken = (req, res, next) => {
    let token = req.body.token || req.headers['token'] || req.query.token;

    if (token) {
        jwt.verify(token, config.config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.json({ "error": err });
            }
            req.decode = decode;
            next();
        });
    } else {
        return res.status(config.constants.STATUS_CODE.unAuthorized).send({
            "error": config.constants.RESPONSE_MSGS.UNAUTHORIZED
        })
    }
}

module.exports = {
    checkValidToken
}