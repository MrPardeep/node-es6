"use strict";

const gm = require('gm'),
    path = require('path');

let imageUploading = (req, res) => {
    let pathImage = path.join(__dirname, "../media/", req.files[0].filename)
    console.log(pathImage)

    let { filename, mimetype } = req.files[0];
    res.send(201, { filename, mimetype, pathImage });
}

module.exports = {
    imageUploading
}