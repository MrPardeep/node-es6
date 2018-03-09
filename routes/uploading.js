"use strict";

const express = require('express'),
    router = express.Router();

const controller = require('./../controllers');

router.post('/image-upload', (req, res) => {
    controller.imageUploading.imageUploading(req, res);
})

export default router;