"use strict";

class prodConfiguration {
    constructor() {
        this.TAG = "production";
        this.hostName = 'mLab';
        this.appPort = 3000;
        this.dbConfig = {
            // MongoDB connection configs
            mongoDB: {
                dbName: "techie",
                get dbUrl() {
                    return `mongodb://techieuser:techie@ds233218.mlab.com:33218/${this.dbName}`;
                }
            }
        }
    }
    getConfigs() {
        return this;
    }
}

export default {
    prodConfiguration
}