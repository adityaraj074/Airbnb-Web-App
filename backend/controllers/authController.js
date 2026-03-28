const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByUsername,
  findUserByEmail,
} = require("../models/userModel");

// Signup
const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    username = username?.trim();
    email = email?.trim();

    // Username validation
    if (!username) {
      return res.status(400).json({ error: "USERNAME_REQUIRED" });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: "USERNAME_TOO_SHORT" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return res.status(400).json({ error: "EMAIL_REQUIRED" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL" });
    }

    // Password validation
    if (!password) {
      return res.status(400).json({ error: "PASSWORD_REQUIRED" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "PASSWORD_TOO_SHORT" });
    }

    // Check existing email
    if (await findUserByEmail(email)) {
      return res.status(400).json({ error: "EMAIL_EXISTS" });
    }

    // Check existing username
    if (await findUserByUsername(username)) {
      return res.status(400).json({ error: "USERNAME_EXISTS" });
    }

    // Create user
    const user = await createUser({ username, email, password });

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

// Login
const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ error: "USERNAME_REQUIRED" });
    }
    if (!password) {
      return res.status(400).json({ error: "PASSWORD_REQUIRED" });
    }

    username = username.trim();

    const user = await findUserByUsername(username);

    // Username not found
    if (!user) {
      return res.status(400).json({ error: "INVALID_USERNAME" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Password wrong
    if (!isMatch) {
      return res.status(400).json({ error: "INVALID_PASSWORD" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

module.exports = { signup, login };
