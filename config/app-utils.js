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

/* For password decryption using bcrypt */
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

let passwordCompare = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(req.password, hash).then((res) => {
            // res == false
        });
    })
}

/* Set Headers to request to avoid CORS error while API's hitting */
let setCorsHeader = (res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    return res;
}

let getNodeEnv = () => {
    return process.env.NODE_ENV;
}

module.exports = {
    hasEmptyProperties,
    trimValues,
    isValidEmail,
    passwordEncryption,
    setCorsHeader,
    getNodeEnv
}