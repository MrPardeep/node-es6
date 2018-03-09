"use strict";

import jwt from 'jsonwebtoken';
import config from './../config';

let checkValidToken = async(req, res, next) => {
    let token = req.body.token || req.headers['token'] || req.query.token;

    if (token) {
        try {
            let isverified = await jwt.verify(token, config.config.JWT_SECRET)
            if (checkAuthorization(isverified, req)) {
                req.decode = isverified;
                next();
            } else {
                return config.responseHndlr.getUnauthorizedMsg();
            }
        } catch (error) {
            console.log(error, 'error handling');
            return res.status(config.constants.STATUS_CODE.unAuthorized).send({
                message: config.constants.RESPONSE_MSGS.UNAUTHORIZED
            });
        }
    } else {
        return res.status(config.constants.STATUS_CODE.unAuthorized).send({
            message: config.constants.RESPONSE_MSGS.UNAUTHORIZED
        });
    }
}

let checkAuthorization = (tokenDetail, req) => {
    // console.log(tokenDetail, req.baseUrl);
    if (tokenDetail.role === '0' && req.baseUrl === '/admin') {
        return true
    } else
        return true
}

export default {
    checkValidToken
}