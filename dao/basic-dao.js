"use strict";

let saveEntry = (model) => {
    console.log(model, '----');
    return model.save();
}

let findEntry = (model, query) => {
    return model.find(query);
}

let findOneEntry = (model, query) => {
    return model.find(query);
}

module.exports = {
    saveEntry,
    findEntry,
    findOneEntry
}