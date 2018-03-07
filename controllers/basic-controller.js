"use strict";

import config from './../config';
import basicModel from "./../models/basic";
import dao from './../dao';

let saveRole = async(req, res, next) => {
    const keysRequired = ['name'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return { error: config.constants.RESPONSE_MSGS.FIELDS_MISSING };
    }
    try {
        let roleModel = new basicModel.role(req);
        let roleSave = await dao.basicDao.saveEntry(roleModel);
        if (roleSave) {
            return { messgae: 'role saved' };
        }
    } catch (error) {
        return { error: error };
    }
}

let getRole = async(req, res, next) => {
    try {
        let roleList = await dao.basicDao.findEntry(basicModel.role);
        return { status: config.constants.STATUS_CODE.success, data: roleList };
    } catch (err) {
        return { status: config.constants.STATUS_CODE.server_error, messgae: 'Some exceptions are there' }
    }
}

let saveDepartment = async(req, res, next) => {
    const keysRequired = ['name'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return config.responseHndlr.getPropertyMissingMsg();
    }

    let departmentModel = new basicModel.department(req);
    let departmentSave = await dao.basicDao.saveEntry(departmentModel);
    if (departmentSave) {
        return { messgae: 'Department saved' };
    }
}

let getDepartment = async(req, res, next) => {
    try {
        let departmentList = await dao.basicDao.findEntry(basicModel.department);
        return config.responseHndlr.getSuccessMsg(departmentList);
    } catch (err) {
        return config.responseHndlr.getServerErrorMsg();
    }
}

module.exports = {
    saveRole,
    getRole,
    saveDepartment,
    getDepartment
}