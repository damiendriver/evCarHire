const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Member = require("../models/member");

router.post("/register", async (req, res) => {
    console.log(req.body);
    const newmember = new Member (req.body);

  try {
    const member = await newmember.save();
    res.send("Member Register Success");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({ email: email, password: password });
    if (member) {
        res.send(member);
      } 
      else {
        return res
          .status(400)
          .json({ message: "Login Failed. Incorrect password" });
      }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
