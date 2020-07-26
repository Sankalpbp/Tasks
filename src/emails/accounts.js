'use strict'

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sankalpnitj@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sankalpnitj@gmail.com',
        subject: 'Sorry to see you go.',
        text: `Goodbye, ${name}. If there was anything that we could have done to keep you onboard.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
};
