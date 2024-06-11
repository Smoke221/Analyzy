const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
require("dotenv").config();

async function createAccount(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the user's password before saving it to the database
    const hash = await bcrypt.hash(password, 10);

    // Check if a user with the given email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    // Create a new user document with the hashed password
    const newUser = new userModel({ name, email, password: hash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by their email in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res
        .status(401)
        .json({ message: "Password is incorrect, please try again." });
    }

    // Create a JWT token for the user's successful login
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ message: "Login successful." });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createAccount, login };
