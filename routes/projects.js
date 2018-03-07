"use strict";

const express = require('express'),
    router = express.Router();

const projectsController = require('./../controllers/projects-controller'),
    errorHndlr = require('../config/errHandler'),
    middleware = require('./../middlewares');

/* 
    Add Project API
    Requested URL : localhost:3000/admin/add-projecr
    Requested Params : { name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price }
*/

router.post('/add-project', async(req, res) => {
    let { name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price } = req.body;

    try {
        let saveProjects = await projectsController.saveProjects({ name, code, description, department, manager, type, startDate, estEndDate, actualEndDate, currency, allowedHours, price });
        if (saveProjects) {
            return res.send({ message: "Project saved" });
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

/* 
    Get Projects API
    Requested URL : localhost:3000/admin/project
*/

router.get('/projects', async(req, res) => {
    try {
        let getProjects = await projectsController.getProjects();
        if (getProjects) {
            return res.send(getProjects);
        }
    } catch (error) {
        return errorHndlr.errorMsg(error);
    }
});

module.exports = router;