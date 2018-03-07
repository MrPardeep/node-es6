"use strict";

import config from './../config';
import model from "./../models";
import dao from './../dao';
import errorHnldr from '../config/errHandler';
import resHnldr from '../config/resHandler';

/* const config = require("./../config"),
    articlesModel = require("./../models/articles"); */

let saveProjects = async(req, res, next) => {
    const keysRequired = ['name', 'manager'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return resHnldr.getPropertyMissingMsg();
    }
    try {
        let projectModel = new model.projectModel(req);
        let projectSave = await dao.basicDao.saveEntry(projectModel);
        if (projectSave) {
            return { result: 'project saved' };
        }
    } catch (error) {
        return errorHnldr.errorMsg(error);
    }
}

let getProjects = async(req, res, next) => {
    try {
        let projectsList = await dao.basicDao.findEntry(model.projectModel);
        return config.responseHndlr.getSuccessMsg(projectsList);
    } catch (err) {
        return config.responseHndlr.getServerErrorMsg();
    }
}

module.exports = {
    saveProjects,
    getProjects
}