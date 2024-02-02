const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Member = require("../models/member");

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { name, email, password } = req.body;

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
  const { email, password } = req.body;

  try {
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

