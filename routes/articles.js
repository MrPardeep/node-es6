"use strict";

const express = require('express'),
    router = express.Router();

const articlesController = require('./../controllers/articles-controller');

router.post('', async(req, res) => {
    let { title, author, publishedOn, details } = req.body;

    try {
        let saveArticles = await articlesController.saveArticles(req);
        if (saveArticles) {
            return res.send({ result: "Articles saved" });
        }
    } catch (error) {
        return res.send({ error: error });
    }
});

module.exports = router;