"use strict";

const DB_CONNECTION_KEY = 'mongodb://localhost/test',
    DB_CONNECTION_KEY_HRM = 'mongodb://localhost/wildnetHRM',
    DB_CLOUD_KEY = 'mongodb://techieuser:techie@ds233218.mlab.com:33218/techie';


let connectDB = (env, callback) => {

}

export default {
    DB_CONNECTION_KEY,
    DB_CONNECTION_KEY_HRM,
    DB_CLOUD_KEY,
    connectDB
}