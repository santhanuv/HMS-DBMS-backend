const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "anthony.hoppe97@ethereal.email",
    pass: "cTp9KZp1a1WmZJysfp",
  },
});

module.exports = transporter;
