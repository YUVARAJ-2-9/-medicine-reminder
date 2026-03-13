const nodemailer = require('nodemailer')
require('dotenv').config()

console.log('Email User:', process.env.EMAIL_USER)
console.log('Email Pass exists:', !!process.env.EMAIL_PASS)

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error.message)
  } else {
    console.log('✅ Email server ready!')
  }
})

module.exports = transporter