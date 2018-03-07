"use strict";

const express = require('express'),
    router = express.Router();

const basicController = require('./../controllers/basic-controller'),
    middleware = require('./../middlewares');

router.post('/role', async(req, res) => {
    let { name, key } = req.body;

    try {
        let saveRole = await basicController.saveRole({ name, key });
        if (saveRole) {
            return res.send({ message: "Role created" });
        }
    } catch (error) {
        return res.send({ error: error });
    }
});

router.get('/role', async(req, res) => {
    try {
        let getRole = await basicController.getRole();
        if (getRole) {
            return res.send(getRole);
        }
    } catch (error) {
        return res.send({ error: error });
    }
});

router.post('/department', async(req, res) => {
    let { name, key } = req.body;

    try {
        let saveRole = await basicController.saveDepartment({ name, key });
        if (saveRole) {
            return res.send({ message: "Department created" });
        }
    } catch (error) {
        return res.send({ error: error });
    }
});

router.get('/department', async(req, res) => {
    try {
        let departmentList = await basicController.getDepartment();
        if (departmentList) {
            return res.send(departmentList);
        }
    } catch (error) {
        return res.send({ error: error });
    }
});

module.exports = router;