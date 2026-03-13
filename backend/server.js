const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const startReminderCron = require('./utils/reminderCron')

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/medicines', require('./routes/medicineRoutes'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: '💊 Medicine Reminder API Running! ✅' })
})

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  // Cron start pannuvom
  startReminderCron()
})