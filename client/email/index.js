"use strict";

const nodemailer = require('nodemailer'),
    constants = require('./../../config/constants');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: constants.EMAIL_INFO.USERNAME,
        pass: constants.EMAIL_INFO.PASSWORD
    }
});

const mailOptions = (emailTo) => {
    return {
        from: constants.EMAIL_INFO.USERNAME,
        to: 'erpardeepjain@gmail.com',
        subject: 'Forgot password link for youApp',
        html: { path: 'client/email/templates/basic.html' }
    }
};

let sendEmail = (emailTo) => {
    transporter.sendMail(mailOptions(emailTo), (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail
}