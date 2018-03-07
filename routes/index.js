"use strict";

const middleware = require('./../middlewares'),
    authRoutes = require('./auth'),
    articlesRoutes = require('./articles'),
    ProjectRoutes = require('./projects'),
    basicRoutes = require('./basic'),
    uploading = require('./uploading');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/upload', uploading);
    app.use('/articles', articlesRoutes);
    app.use('/api', basicRoutes);
    app.use('/admin', middleware.checkAuth.checkValidToken, ProjectRoutes);

    /* Used to fetch Device Type */
    app.get('/hello', (req, res) => {
        res.send("Hi to " + req.device.type.toUpperCase() + " User");
    });
}