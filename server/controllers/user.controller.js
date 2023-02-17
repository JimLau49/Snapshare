require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

exports.renewToken = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    const newToken = generateToken(user);

    return res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    switch (true) {
      case !email:
        return res.status(400).json({ msg: 'Email field is empty' });
      case !password:
        return res.status(400).json({ msg: 'Password field is empty' });
      case !username:
        return res.status(400).json({ msg: 'Username field is empty' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    const username = user.username;

    const token = jwt.sign(
      { id: user._id, username: username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  register,
  login,
};
