const STATUS_CODE = {
    'created': 201,
    'unAuthorized': 401,
    'notFound': 204,
    'error': 500
};

const RESPONSE_MSGS = {
    EMAIL_EXIST: 'This Email Id is already exist',
    FIELDS_MISSING: 'Required fields are missing',
    INVALID_EMAIL: 'Email ID you entered is invalid',
    UNAUTHORIZED: 'User is not authorized'
}

const SALT_ROUNDS = 5;

module.exports = {
    STATUS_CODE,
    RESPONSE_MSGS,
    SALT_ROUNDS
}