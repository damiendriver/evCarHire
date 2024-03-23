const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL_HERE,
      pass: process.env.ZOHO_PASSWORD_HERE,
    },
  });

  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.ZOHO_EMAIL_HERE,
    cc: email,
    subject: 'New Enquiry from Contact Form',
    text: message,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
