"use strict";

import constants from './constants';

let getPropertyMissingMsg = () => {
    return { status: constants.STATUS_CODE.error, message: constants.RESPONSE_MSGS.FIELDS_MISSING };
}

let getInvalidEmailMsg = () => {
    return { status: constants.STATUS_CODE.error, message: constants.RESPONSE_MSGS.INVALID_EMAIL };
}

let getServerErrorMsg = () => {
    return { status: constants.STATUS_CODE.server_error, message: constants.RESPONSE_MSGS.EXCEPTION_MSG }
}

let getSuccessMsg = (data = {}) => {
    return { status: constants.STATUS_CODE.success, data: data }
}

module.exports = {
    getPropertyMissingMsg,
    getInvalidEmailMsg,
    getServerErrorMsg,
    getSuccessMsg
}