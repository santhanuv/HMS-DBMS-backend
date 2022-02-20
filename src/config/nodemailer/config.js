const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'jennie.considine4@ethereal.email',
      pass: 'fW8gjJUsMz8vy5CXhJ'
  }
});

module.exports = transporter;
