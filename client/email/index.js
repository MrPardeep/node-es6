"use strict";

import nodemailer from 'nodemailer';
import constants from './../../config/constants';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: constants.EMAIL_INFO.USERNAME,
        pass: constants.EMAIL_INFO.PASSWORD
    }
});

let mailOptions = (emailerOptions) => {
    return {
        from: constants.EMAIL_INFO.USERNAME,
        to: emailerOptions.to,
        subject: 'Forgot password link for youApp',
        html: '<h1>Welcome</h1> ' + emailerOptions.to + ' You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + emailerOptions.host + '/reset/' || 'localhost:4200//reset-password' + emailerOptions.token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
};

let sendEmail = async(emailTo) => {
    try {
        let emailSent = await transporter.sendMail(mailOptions(emailTo))
        if (emailSent)
            return { emailSent };
    } catch (error) {
        return { error: error };
    }
}

export default {
    sendEmail
}

// html: { path: 'client/email/templates/basic.html' }  // This piece of code used for sending HTML file over the email using nodemailer