"use strict";

import express from 'express';
const router = express.Router();

import articlesController from './../controllers/articles-controller';
import middleware from './../middlewares';

router.post('', middleware.checkAuth.checkValidToken, async(req, res) => {
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

export default router