const cron = require('node-cron')
const Medicine = require('../models/Medicine')
const User = require('../models/User')
const sendReminderEmail = require('./sendReminderEmail')

const startReminderCron = () => {
  // Every minute check pannuvom
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date()
      const currentHour = now.getHours().toString().padStart(2, '0')
      const currentMin = now.getMinutes().toString().padStart(2, '0')
      const currentTime = `${currentHour}:${currentMin}`

      console.log(`⏰ Cron running at ${currentTime}`)

      // All medicines fetch pannuvom
      const medicines = await Medicine.find({
        times: { $in: [currentTime] },
        isTaken: false
      })

      if (medicines.length === 0) return

      console.log(`💊 Found ${medicines.length} medicine(s) for ${currentTime}`)

      // Each medicine ku email send pannuvom
      for (const medicine of medicines) {
        const user = await User.findById(medicine.userId)
        if (!user) continue

        await sendReminderEmail(
          user.email,
          user.name,
          {
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            notes: medicine.notes,
            currentTime
          }
        )
      }
    } catch (error) {
      console.error('❌ Cron job error:', error)
    }
  })

  console.log('✅ Reminder cron job started!')
}

module.exports = startReminderCron