"use strict";

const middleware = require('./../middlewares'),
    authRoutes = require('./auth'),
    uploading = require('./uploading'),
    userRoutes = require('./user');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/upload', uploading);
    app.use('/user', middleware.checkAuth.checkValidToken, userRoutes);
}