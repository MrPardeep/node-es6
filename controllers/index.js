"use strict";

const authController = require('./auth-controller'),
    basicController = require('./basic-controller'),
    projectsController = require('./projects-controller'),
    imageUploading = require('./uploading-controller');

module.exports = {
    authController,
    imageUploading,
    projectsController,
    basicController
}