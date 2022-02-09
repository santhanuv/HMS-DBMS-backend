const transporter = require("../config/nodemailer/config");
const nodemailer = require("nodemailer");

const sendMail = (mail) => {
  const info = transporter.sendMail(mail);
  console.log(info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));
};

module.exports = sendMail;
