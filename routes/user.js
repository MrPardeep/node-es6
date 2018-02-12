"use strict";

const express = require('express'),
    router = express.Router();

router.get('/users', (req, res) => {
    console.log(req.baseUrl, req.app);
    res.status(200).send(req.decode);
});

module.exports = router;