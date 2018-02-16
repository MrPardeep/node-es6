"use strict";

import config from './../config';
import saveArticles from "./../models/articles";

let saveArticles = async(req, res, next) => {
    const keysRequired = ['title', 'author'],
        checkForEmptyProps = config.appUtils.checkForEmptyProps(req.body, keysRequired);

    if (checkForEmptyProps) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING };
    }
    try {
        let articleSave = await saveArticles.save();
        if (articleSave) {
            return { result: 'article saved' };
        }
    } catch (error) {
        return { error: error };
    }

}

module.exports = {
    saveArticles
}