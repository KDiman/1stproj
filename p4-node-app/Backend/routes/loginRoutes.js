const express = require("express");
const router = express.Router();
const LogIn = require('../objects/logInObjects');
const login = new LogIn();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()


router.post("/create_account", async (req, res) => {
  try {
    const logInDetails = req.body;
    const savedDetails = await login.createAccount(logInDetails);
    res.status(201).json(savedDetails);
  } catch (error) {
    console.error("Error creating New Account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Public Route: User Login
router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await login.findUsername(Username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a token with a 1-minute expiration (60 seconds)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60s' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { _id: user._id, Username: user.Username },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/protected', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    res.status(200).json({ message: 'Authenticated route', userId });
  } catch (error) {
    console.error('Error in /protected route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
