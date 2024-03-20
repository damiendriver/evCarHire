const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

module.exports = router;
