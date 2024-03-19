const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Member = require("../models/member");
const memberModel = require("../models/member");
const nodemailer = require("nodemailer");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  confirm: Joi.string().valid(Joi.ref("password")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // check if email entered is unique
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({
        error: "Email is already registered. Please use a different Email",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new Member({
      name,
      email,
      password: hashedPassword,
    });

    const member = await newMember.save();
    res.send("Member Register Success");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const member = await Member.findOne({ email });

    if (member) {
      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, member.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { email: member.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const hidden = {
          name: member.name,
          email: member.email,
          isAdmin: member.isAdmin,
          _id: member._id,
        };

        res.cookie("token", token);
        res.send(hidden);
      } else {
        return res
          .status(400)
          .json({ message: "Login Failed. Incorrect password" });
      }
    } else {
      return res.status(400).json({ message: "Login Failed. User Not Found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/getallmembers", async (req, res) => {
  try {
    const members = await Member.find();
    res.send(members);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const member = await memberModel.findOne({ email });
    if (!member) {
      return res.status(404).json({ status: "Member Not Known" });
    }

    const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const resetLink = `http://localhost:3000/reset-password/${member._id}/${token}`;

    // Setting up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL_HERE,
        pass: process.env.ZOHO_PASSWORD_HERE,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.ZOHO_EMAIL_HERE,
      to: email,
      subject: "Reset Your Password",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    // Sending the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ status: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Server Error" });
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ status: "Error with Token" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedMember = await memberModel.findByIdAndUpdate(
          { _id: id },
          { password: hashedPassword }
        );

        if (!updatedMember) {
          return res.status(404).json({ status: "Member not found" });
        }

        return res.status(200).json({ status: "Success" });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "Error updating password", error: error.message });
      }
    }
  });
});

module.exports = router;
