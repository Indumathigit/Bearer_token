const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function register(req, res) {
  try {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    var newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
}

async function login(req, res) {
  try {
    var email = req.body.email;
    var password = req.body.password;

    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    var isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    var token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token: token });

  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
}

async function getUser(req, res) {
  try {
    var user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
}

module.exports = { register, login, getUser };