const express = require("express");
const bcrypt = require("bcryptjs");
const session= require("express-session")
const jwt = require("jsonwebtoken");
const User = require("../model/user");


const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {

  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });

  res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user.id },
    "jwt_secret",
    { expiresIn: "1h" }
  );

  req.session.user=user.id;
  res.status(200).json({ message: "Login successful" });
    
  } catch (error) {
    res.status(500).json({msg:error})
  }
  
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;