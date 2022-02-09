const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "katelin.marks87@ethereal.email",
    pass: "5pykqvgJn5rBfKsCKV",
  },
});

module.exports = transporter;
