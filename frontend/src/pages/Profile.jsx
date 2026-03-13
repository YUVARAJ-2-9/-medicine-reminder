import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

export default function Profile() {
  const { user, logout } = useAuth()
  const [showLogout, setShowLogout] = useState(false)

  const menuItems = [
    { icon: "👤", label: "Name", value: user?.name },
    { icon: "📧", label: "Email", value: user?.email },
    { icon: "🔔", label: "Reminders", value: "Email notifications ON" },
    { icon: "💊", label: "App Version", value: "MedReminder v1.0" },
  ]

  return (
    <div className="min-h-screen pb-24" style={{ background: "transparent" }}>
      <div className="max-w-md mx-auto px-4 pt-6">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          My Profile
        </motion.h1>

        {/* Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl p-6 text-white text-center mb-6"
          style={{ background: "linear-gradient(135deg, #C4956A, #8B6B4A)" }}
        >
          <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-4xl mx-auto mb-3">
            👤
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
            {user?.name}
          </h2>
          <p className="text-sm opacity-80 mt-1">{user?.email}</p>
          <div className="mt-3 inline-block px-4 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            ✅ Email Reminders Active
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 shadow-sm mb-4"
        >
          {menuItems.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: "#F7F2EC" }}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                </div>
              </div>
              {i < menuItems.length - 1 && (
                <div className="h-px mx-2" style={{ background: "#F7F2EC" }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowLogout(true)}
          className="w-full py-4 rounded-2xl font-bold text-white"
          style={{ background: "#EE5555" }}
        >
          🚪 Logout
        </motion.button>

        {/* Logout Confirm */}
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm text-center"
            >
              <div className="text-5xl mb-3">🚪</div>
              <h3 className="text-lg font-bold mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}>
                Logout?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Unga account la irundhu logout aagureengala?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 py-3 rounded-2xl font-semibold text-gray-600"
                  style={{ background: "#F7F2EC" }}
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="flex-1 py-3 rounded-2xl font-semibold text-white"
                  style={{ background: "#EE5555" }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}