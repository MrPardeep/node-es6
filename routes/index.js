"use strict";

const middleware = require('./../middlewares'),
    authRoutes = require('./auth'),
    uploading = require('./uploading');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/upload', uploading);

    /* Used to fetch Device Type */
    app.get('/hello', (req, res) => {
        res.send("Hi to " + req.device.type.toUpperCase() + " User");
    });
}

/* articlesRoutes = require('./articles');
app.use('/articles', middleware.checkAuth.checkValidToken, articlesRoutes); */