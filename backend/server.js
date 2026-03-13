const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const startReminderCron = require('./utils/reminderCron')

dotenv.config()
connectDB()

const app = express()

// CORS - Vercel URL add pannuvom
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://medicine-reminder-two.vercel.app'
  ],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/medicines', require('./routes/medicineRoutes'))

app.get('/', (req, res) => {
  res.json({ message: '💊 Medicine Reminder API Running! ✅' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  startReminderCron()
})