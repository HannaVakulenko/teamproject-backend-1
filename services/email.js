const nodemailer = require("nodemailer");
const META_PASSWORD = process.env.META_PASSWORD;

const sendEmail = (email, verificationToken, name) => {
    const config = {
        host: "smtp.meta.ua",
        port: 465,
        secure: true,
        auth: {
            user: "goosetrack_team@meta.ua",
            pass: META_PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: "goosetrack_team@meta.ua",
        to: `${email}`,
        subject: "Activate your Mailchimp account",
        html: `<div style="font-family: Arial, sans-serif; width: 100%; background-color: #dcebf7; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px;">
        <h1 style="text-align: center; color:#3e85f3; font-size: 32px;"><b>Welcome to GooseTrack!</b></h1>
        <h3 style="text-align: center; color:#171820; font-size: 18px;">We're glad you're here, ${name} 🥳</h3>
        <p style="text-align: center;"><em><span style="color: #171820; font-size: 18px;">Just confirming you're you.</span></em></p>
        <div style="margin: 0 auto; text-align: center;">
        <a target="_blank" style="display: inline-block; margin: 0 auto; font-size: 18px; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;" href="http://localhost:3000/?varification=${verificationToken}">Activate Account</a>
        </div>
        <br>
        <p style="text-align: center; color: #171820; font-size: 18px;">If you didn't sign up for an account, you can safely ignore this email.</p>
        <p style="text-align: center; color: #171820; font-size: 18px;">Best regards,</p>
        <p style="text-align: center; color: #171820; font-size: 18px;">The AugooseTeam</p>
      </div>
    </div>`,
    };

    transporter
        .sendMail(emailOptions)
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
};

module.exports = {
    sendEmail,
};
