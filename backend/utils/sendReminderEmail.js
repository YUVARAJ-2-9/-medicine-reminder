const transporter = require('../config/emailConfig')

const sendReminderEmail = async (userEmail, userName, medicine) => {
  const mailOptions = {
    from: `"MedReminder 💊" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `💊 Medicine Reminder - ${medicine.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'DM Sans', Arial, sans-serif; background: #F7F2EC; margin: 0; padding: 0; }
          .container { max-width: 500px; margin: 30px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #C4956A, #8B6B4A); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 8px 0 0; opacity: 0.85; font-size: 14px; }
          .body { padding: 30px; }
          .greeting { font-size: 16px; color: #2d2d2d; margin-bottom: 20px; }
          .medicine-card { background: #F7F2EC; border-radius: 14px; padding: 20px; margin: 20px 0; border-left: 4px solid #C4956A; }
          .medicine-card h2 { margin: 0 0 12px; color: #2d2d2d; font-size: 20px; }
          .info-row { display: flex; align-items: center; margin: 8px 0; font-size: 14px; color: #555; }
          .info-row span { margin-right: 8px; font-size: 18px; }
          .badge { display: inline-block; background: #C4956A; color: white; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-top: 16px; }
          .footer { background: #1a1a2e; padding: 20px; text-align: center; color: #888; font-size: 12px; }
          .footer strong { color: #C4956A; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💊 MedReminder</h1>
            <p>Time to take your medicine!</p>
          </div>
          <div class="body">
            <p class="greeting">Hi <strong>${userName}</strong>! 👋</p>
            <p style="color: #888; font-size: 14px;">This is your scheduled medicine reminder.</p>
            
            <div class="medicine-card">
              <h2>💊 ${medicine.name}</h2>
              <div class="info-row"><span>⚗️</span> Dosage: <strong style="margin-left:4px">${medicine.dosage}</strong></div>
              <div class="info-row"><span>🔄</span> Frequency: <strong style="margin-left:4px">${medicine.frequency}</strong></div>
              <div class="info-row"><span>⏰</span> Time: <strong style="margin-left:4px">${medicine.currentTime}</strong></div>
              <div class="info-row"><span>📅</span> Date: <strong style="margin-left:4px">${new Date().toDateString()}</strong></div>
              ${medicine.notes ? `<div class="info-row"><span>📝</span> Note: <strong style="margin-left:4px">${medicine.notes}</strong></div>` : ''}
              <div><span class="badge">Take your medicine now! ✅</span></div>
            </div>

            <p style="color: #aaa; font-size: 12px; margin-top: 20px;">
              Stay healthy and never miss a dose. Open MedReminder to mark it as taken.
            </p>
          </div>
          <div class="footer">
            <strong>MedReminder App</strong> • Your health companion 💙<br/>
            <span style="font-size: 11px;">This is an automated reminder. Please do not reply.</span>
          </div>
        </div>
      </body>
      </html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ Reminder email sent to ${userEmail} for ${medicine.name}`)
    return true
  } catch (error) {
    console.error(`❌ Email send failed:`, error)
    return false
  }
}

module.exports = sendReminderEmail