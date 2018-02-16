"use strict";

let saveEntry = (model) => {
    return model.save();
}

let findEntry = async(model, query) => {
    let findEntry = await model.find(query);
    return findEntry;
}

let findOneEntry = (model, query) => {
    return model.findOne(query);
}

module.exports = {
    saveEntry,
    findEntry,
    findOneEntry
}