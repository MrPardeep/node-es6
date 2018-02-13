"use strict";

let saveEntry = (model) => {
    console.log(model, '----');
    return model.save();
}

let findEntry = (model, query) => {
    return model.find(query).then((result) => {
        return result;
    }).catch(error => {
        return error;
    })
}

let findOneEntry = (model, query) => {
    return model.find(query).then((result) => {
        return result;
    }).catch(error => {
        return error;
    })
}

module.exports = {
    saveEntry,
    findEntry,
    findOneEntry
}