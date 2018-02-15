const STATUS_CODE = {
    'created': 201,
    'unAuthorized': 401,
    'notFound': 204,
    'error': 500
};

const ERROR_MESSAGES = {
    INTERNAL_SERVER: 'Some error occured on server side'
}

const EMAIL_INFO = {
    USERNAME: 'pardeep.wildnet@gmail.com',
    PASSWORD: 'innotical123'
}

const RESPONSE_MSGS = {
    EMAIL_EXIST: 'This Email Id is already exist',
    FIELDS_MISSING: 'Required fields are missing',
    INVALID_EMAIL: 'Email ID you entered is invalid',
    UNAUTHORIZED: 'User is not authorized',
    USER_NOT_FOUND: 'User not found',
    SIGNUP_SUCCESS: 'User sign up successfull'
}

const SALT_ROUNDS = 5;

module.exports = {
    STATUS_CODE,
    RESPONSE_MSGS,
    ERROR_MESSAGES,
    SALT_ROUNDS,
    EMAIL_INFO
}