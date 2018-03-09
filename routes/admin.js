"use strict";

import express from 'express';
const router = express.Router();

import adminController from './../controllers/admin-controller';
import errorHndlr from '../config/errHandler';
import middleware from './../middlewares';

/*________________________________________________________________________
 * @Date        :   -
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Add Project API
 * Requested URL:   localhost:3000/admin/add-project
 * Params       :   { name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price }
 * Method       :   POST
 _________________________________________________________________________
*/

router.post('/add-project', async(req, res) => {
    let { name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price } = req.body;

    try {
        let saveProjects = await adminController.saveProjects({ name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price });
        if (saveProjects) {
            return res.send({ message: "Project saved" });
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   -
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get Projects Lisr API
 * Requested URL:   localhost:3000/admin/projects
 * Method       :   GET
 _________________________________________________________________________
*/

router.get('/projects', async(req, res) => {
    try {
        let getProjects = await adminController.getProjects();
        if (getProjects) {
            return res.send(getProjects);
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Add Role API
 * Requested URL:   localhost:3000/admin/role
 * Params       :   { name, key }
 * Method       :   POST
 _________________________________________________________________________
*/

router.post('/role', async(req, res) => {
    let { name, key } = req.body;

    try {
        let saveRole = await adminController.saveRole({ name, key });
        if (saveRole) {
            return res.send({ message: "Role created" });
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get Role List API
 * Requested URL:   localhost:3000/admin/role
 * Method       :   GET
 _________________________________________________________________________
*/

router.get('/role', async(req, res) => {
    try {
        let getRole = await adminController.getRole();
        if (getRole) {
            return res.send(getRole);
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Add department API
 * Requested URL:   localhost:3000/admin/department
 * Params       :   { name, code, key }
 * Method       :   POST
 _________________________________________________________________________
*/

router.post('/department', middleware.checkAuth.checkValidToken, async(req, res) => {
    let { name, code, key } = req.body;

    try {
        let saveRole = await adminController.saveDepartment({ name, code, key });
        if (saveRole) {
            return res.send({ message: "Department created" });
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get department List API
 * Requested URL:   localhost:3000/admin/department
 * Method       :   GET
 _________________________________________________________________________
*/

router.get('/department', async(req, res) => {
    try {
        let departmentList = await adminController.getDepartment();
        if (departmentList) {
            return res.send(departmentList);
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get department List API
 * Requested URL:   localhost:3000/admin/manager
 * Method       :   GET
 _________________________________________________________________________
*/
router.get('/manager', async(req, res, next) => {
    try {
        let response = await adminController.getManagerList(req);
        return res.send(response);
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Add User API
 * Requested URL:   localhost:3000/admin/add-user
 * Params       :   { email, password, country, name, dob, role, phone, status}
 * Method       :   POST
 _________________________________________________________________________
*/
router.post('/add-user', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    let { email, password, country, name, dob, role, phone, status } = req.body;

    try {
        let response = await controller.authController.userSignup({ email, password, country, name, dob, role, phone, status });
        return res.send(response);
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get user List API
 * Requested URL:   localhost:3000/admin/user
 * Method       :   GET
 _________________________________________________________________________
*/
router.get('/user', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    try {
        let response = await adminController.getUserList();
        return res.send(response);
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/*________________________________________________________________________
 * @Date        :   3/6/2018
 * Modified On  :	3/7/2018
 * @Author      :   Pardeep Jain
 * @Purpose     :   Get Single User API
 * Requested URL:   localhost:3000/admin/user/:id
 * Method       :   GET
 _________________________________________________________________________
*/
router.get('/user/:id', middleware.checkAuth.checkValidToken, async(req, res, next) => {
    try {
        let response = await adminController.getUser(req);
        return res.send(response);
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

export default router