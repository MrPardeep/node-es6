"use strict";

const appUtils = require('./../app-utils'),
    prodConfig = require('./prod');

const env = () => {
    let Config;
    console.log(appUtils.getNodeEnv());
    switch (appUtils.getNodeEnv()) {
        case 'dev':
        case 'development':
            Config = require('./default');
            break;
        case 'production':
            Config = require('./prod');
            break;
        default:
            Config = require('./default');
            break;
    }

    let config = new Config();
    return config.getConfigs();
}

module.exports = {
    env
}