"use strict";

import middleware from './../middlewares';
import authRoutes from './auth';
import articlesRoutes from './articles';
import adminRoutes from './admin';
import uploading from './uploading';

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/upload', uploading);
    app.use('/articles', articlesRoutes);
    app.use('/admin', adminRoutes);

    /* Used to fetch Device Type */
    app.get('/hello', (req, res) => {
        res.send("Hi to " + req.device.type.toUpperCase() + " User");
    });
}