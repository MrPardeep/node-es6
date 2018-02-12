"use strict";

const bcrypt = require('bcrypt'),
    constants = require('./constants'),
    atob = require('atob');

/* To check whthere request object has required filed or not */
let hasEmptyProperties = (obj, props) => {
    props = props && props.length > 0 ? props : Object.keys(obj);
    let hasEmptyProps = false;

    obj = trimValues(obj);
    for (let property of props) {
        hasEmptyProps = hasEmptyProps || !obj[property].trim();
    }

    return hasEmptyProps;
}

/* To Trim all params of request before any DB action */
let trimValues = (obj) => {
    for (let key in obj) {
        obj[key] = obj[key].trim();
    }
    return obj;
}

/* Regx to validate Email */
let isValidEmail = (email) => {
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return new RegExp(pattern).test(email);
}

/* For password decryption */
let passwordEncryption = (req) => {
    let btoaPassword = atob(req.password);
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(constants.SALT_ROUNDS, (err, salt) => {
            bcrypt.hash(btoaPassword, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                req.password = hash;
                return resolve(req);
            });
        });
    });
}

module.exports = {
    hasEmptyProperties,
    trimValues,
    isValidEmail,
    passwordEncryption
}