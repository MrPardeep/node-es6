"use strict";

let saveEntry = (model) => {
    return model.save();
}

let findEntry = (model, query) => {
    return model.find(query);
}

let findOneEntry = (model, query) => {
    return model.findOne(query);
}

module.exports = {
    saveEntry,
    findEntry,
    findOneEntry
}