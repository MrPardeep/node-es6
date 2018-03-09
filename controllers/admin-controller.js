"use strict";

import config from './../config';
import model from "./../models";
import dao from './../dao';
import errorHnldr from '../config/errHandler';
import resHndlr from '../config/resHandler';
import basicModel from "./../models/basic";

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to save projects into DB
 _________________________________________________________________________
*/

let saveProjects = async(req, res, next) => {
    const keysRequired = ['name', 'manager'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return resHndlr.getPropertyMissingMsg();
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

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to get projects list from DB
 _________________________________________________________________________
*/
let getProjects = async(req, res, next) => {
    try {
        let projectsList = await dao.basicDao.findEntry(model.projectModel);
        return resHndlr.getSuccessMsg(projectsList);
    } catch (err) {
        return resHndlr.getServerErrorMsg();
    }
}

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to save Role into DB
 _________________________________________________________________________
*/
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

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to get Role list from DB
 _________________________________________________________________________
*/
let getRole = async(req, res, next) => {
    try {
        let roleList = await dao.basicDao.findEntry(basicModel.role);
        return { status: config.constants.STATUS_CODE.success, data: roleList };
    } catch (err) {
        return { status: config.constants.STATUS_CODE.server_error, messgae: 'Some exceptions are there' }
    }
}

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to save Department into DB
 _________________________________________________________________________
*/
let saveDepartment = async(req, res, next) => {
    const keysRequired = ['name'],
        checkForEmptyProps = config.appUtils.hasEmptyProperties(req, keysRequired);

    if (checkForEmptyProps) {
        return resHndlr.getPropertyMissingMsg();
    }

    let departmentModel = new basicModel.department(req);
    let departmentSave = await dao.basicDao.saveEntry(departmentModel);
    if (departmentSave) {
        return { messgae: 'Department saved' };
    }
}

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to get departments list from DB
 _________________________________________________________________________
*/
let getDepartment = async(req, res, next) => {
    try {
        let departmentList = await dao.basicDao.findEntry(basicModel.department);
        return resHndlr.getSuccessMsg(departmentList);
    } catch (err) {
        return resHndlr.getServerErrorMsg();
    }
}

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Method to get Manager List from DB
 _________________________________________________________________________
*/
let getManagerList = async(req, res, next) => {
    try {
        let query = { role: 'manager' };
        let userData = await dao.basicDao.findEntry(User.userModel, query)
        return resHndlr.getSuccessMsg(userData);
    } catch (err) {
        return resHndlr.getServerErrorMsg();
    }
}

let getUserList = async(req, res, next) => {
    try {
        let userList = await dao.basicDao.findEntry(User.userModel);
        return resHndlr.getSuccessMsg(userList);
    } catch (err) {
        return resHndlr.getServerErrorMsg();
    }
}

let getUser = async(req, res, next) => {
    try {
        let query = { _id: req.params.id };
        let userData = await dao.basicDao.findOneEntry(User.userModel, query);
        return resHndlr.getSuccessMsg(userData);
    } catch (err) {
        return resHndlr.getServerErrorMsg();
    }
}

export default {
    saveProjects,
    getProjects,
    saveRole,
    getRole,
    saveDepartment,
    getDepartment,
    getManagerList,
    getUserList,
    getUser
}