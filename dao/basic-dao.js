"use strict";

import errorHndlr from '../config/errHandler';

let saveEntry = async(model) => {
    try {
        let isSaved = await model.save();
        return isSaved;
    } catch (error) {
        console.log(error, "Error in DAO layer");
        return errorHndlr.errorMsg(error);
    }
}

let findEntry = async(model, query) => {
    try {
        let findEntry = await model.find(query);
        return findEntry;
    } catch (error) {
        console.log(error, "Error in DAO layer")
        return error
    }
}

let findOneEntry = async(model, query) => {
    try {
        let isFound = await model.findOne(query);
        return isFound;
    } catch (error) {
        console.log(error, "Error in DAO layer")
        return error
    }
}

let update = async(model, to, value) => {
    try {
        let updateEntry = await model.update(to, value);
        return updateEntry;
    } catch (error) {
        console.log(error, "Error in DAO layer")
        return error
    }
}

module.exports = {
    saveEntry,
    findEntry,
    findOneEntry,
    update
}