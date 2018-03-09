"use strict";

import appUtils from './../app-utils';
import prodConfig from './prod';
import defaultConfig from './default';

const env = () => {
    let Config;
    console.log(appUtils.getNodeEnv());
    switch (appUtils.getNodeEnv()) {
        case 'dev':
        case 'development':
            Config = defaultConfig
            break;
        case 'production':
            Config = prodConfig
            break;
        default:
            Config = defaultConfig
            break;
    }

    let config = new Config();
    return config.getConfigs();
}

export default {
    env
}