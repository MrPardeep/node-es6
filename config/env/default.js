"use strict";

class defaultConfiguration {
    constructor() {
        this.TAG = "development";
        this.hostName = 'localhost';
        this.appPort = 3001;
        this.dbConfig = {
            // MongoDB connection configs
            mongoDB: {
                dbName: "test",
                get dbUrl() {
                    return `mongodb://localhost/${this.dbName}`;
                }
            }
        }
    }
    getConfigs() {
        return this;
    }
}

module.exports = defaultConfiguration;