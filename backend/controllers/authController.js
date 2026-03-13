const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error, please try again' })
  }
}

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error, please try again' })
  }
}

// Get Profile
const getProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
}

module.exports = { registerUser, loginUser, getProfile }