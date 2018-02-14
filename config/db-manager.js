"use strict";

const DB_CONNECTION_KEY = 'mongodb://localhost/test',
    DB_CLOUD_KEY = 'mongodb://techieuser:techie@ds233218.mlab.com:33218/techie';


let connectDB = (env, callback) => {

}

module.exports = {
    DB_CONNECTION_KEY,
    DB_CLOUD_KEY,
    connectDB
}