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
        hasEmptyProps = hasEmptyProps || !obj[property];
    }

    return hasEmptyProps;
}

/* To Trim all params of request before any DB action */
let trimValues = (obj) => {
    for (let key in obj) {
        obj[key] = obj[key] && obj[key].trim();
    }
    return obj;
}

/* Regx to validate Email */
let isValidEmail = (email) => {
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return new RegExp(pattern).test(email);
}

/* For password decryption using bcrypt */
let passwordEncryption = async(req) => {
    let btoaPassword = atob(req.password);
    try {
        let genSalt = await bcrypt.genSalt(constants.SALT_ROUNDS);
        if (genSalt) {
            let hashPassword = await bcrypt.hash(btoaPassword, genSalt);
            req.password = hashPassword;
            return req;
        }
    } catch (error) {
        return { err: error }
    }
}

/* Method to compare plain password with DB encrypted password */
let passwordCompare = async(userPassword, dbPassword) => {
    let btoaPassword = atob(userPassword);
    let comparePassword = await bcrypt.compare(btoaPassword, dbPassword)
    if (comparePassword) {
        return comparePassword;
    }
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
    passwordCompare,
    setCorsHeader,
    getNodeEnv
}