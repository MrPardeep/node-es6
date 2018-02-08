const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../models');
const config = require('./../config/config');

router.get('/users', (req, res) => {
    res.status(200).send(req.decode);
})

module.exports = router;