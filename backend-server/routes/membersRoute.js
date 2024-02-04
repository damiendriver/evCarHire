const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const Member = require("../models/member");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  confirm: Joi.string().valid(Joi.ref('password')).required(), 
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { error } =registerSchema.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // check if email entered is unique
    const existingMember = await Member.findOne({ email });
    if(existingMember) {
      return res.status(400).json({ error: 'Email is already registered. Please use a different Email'})
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
  try{
    const { error } = loginSchema.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

  const { email, password } = req.body;

  const member = await Member.findOne({ email });

    if (member) {
      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, member.password);

      if (passwordMatch) {
        const hidden = {
          name: member.name,
          email: member.email,
          isAdmin: member.isAdmin,
          _id: member._id,
        };

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

module.exports = router;