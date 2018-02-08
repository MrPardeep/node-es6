"use strict";

const middleware = require('./../middlewares'),
    authRoutes = require('./auth'),
    userRoutes = require('./user');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/user', middleware.checkAuth.checkValidToken, userRoutes);
}