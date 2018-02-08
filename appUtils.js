"use strict";

let hasEmptyProperties = (obj, props) => {
    props = props && props.length > 0 ? props : Object.keys(obj);
    let hasEmptyProps = false;

    for (let property of props) {
        hasEmptyProps = hasEmptyProps || !obj[property];
    }

    return hasEmptyProps;
}

module.exports = {
    hasEmptyProperties
}