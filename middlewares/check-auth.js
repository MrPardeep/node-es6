"use strict";

const jwt = require('jsonwebtoken'),
    config = require('./../config');

let checkValidToken = async(req, res, next) => {
    let token = req.body.token || req.headers['token'] || req.query.token;

    if (token) {
        let isverified = await jwt.verify(token, config.config.JWT_SECRET)
        if (isverified) {
            req.decode = isverified;
            next();
        } else {
            return res.status(config.constants.STATUS_CODE.unAuthorized).send({
                message: config.constants.RESPONSE_MSGS.TOKEN_EXPIRY
            });
        }
    } else {
        return res.status(config.constants.STATUS_CODE.unAuthorized).send({
            message: config.constants.RESPONSE_MSGS.UNAUTHORIZED
        });
    }
}

module.exports = {
    checkValidToken
}