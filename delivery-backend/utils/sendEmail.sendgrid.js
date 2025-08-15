const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, html, text }) {
    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL, // Verified sender
        subject,
        text,
        html,
    };
    return sgMail.send(msg);
}

module.exports = sendEmail;
