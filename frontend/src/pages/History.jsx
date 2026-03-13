import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import API from "../utils/api"
import { toast } from "react-toastify"

export default function History() {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines")
      setMedicines(data)
    } catch {
      toast.error("Failed to load history!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  const tabs = [
    { key: "all", label: "All", emoji: "💊" },
    { key: "taken", label: "Taken", emoji: "✅" },
    { key: "pending", label: "Pending", emoji: "⏳" },
  ]

  const filtered = medicines.filter(m => {
    if (activeTab === "taken") return m.isTaken
    if (activeTab === "pending") return !m.isTaken
    return true
  })

  const taken = medicines.filter(m => m.isTaken).length
  const percent = medicines.length > 0
    ? Math.round((taken / medicines.length) * 100)
    : 0

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
          Medicine History 📋
        </motion.h1>

        {/* Completion Rate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl p-6 text-white mb-6"
          style={{ background: "linear-gradient(135deg, #C4956A, #8B6B4A)" }}
        >
          <p className="text-sm opacity-80 mb-1">Overall Completion</p>
          <h2
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {percent}%
          </h2>

          {/* Progress Bar */}
          <div className="bg-white bg-opacity-20 rounded-full h-3 mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-3 rounded-full bg-white"
            />
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-xl font-bold">{taken}</p>
              <p className="text-xs opacity-75">Taken</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{medicines.length - taken}</p>
              <p className="text-xs opacity-75">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{medicines.length}</p>
              <p className="text-xs opacity-75">Total</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm"
        >
          {tabs.map(tab => (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: activeTab === tab.key
                  ? "linear-gradient(135deg, #C4956A, #8B6B4A)"
                  : "transparent",
                color: activeTab === tab.key ? "white" : "#888"
              }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Medicine List */}
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-4xl inline-block"
            >
              💊
            </motion.div>
            <p className="text-gray-400 mt-3">Loading history...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">
              {activeTab === "taken" ? "✅" : activeTab === "pending" ? "⏳" : "💊"}
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {activeTab === "taken"
                ? "No medicines taken yet!"
                : activeTab === "pending"
                ? "No pending medicines!"
                : "No medicines found!"}
            </h3>
            <p className="text-gray-400 text-sm">
              {activeTab === "all" ? "Add medicines from dashboard" : ""}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((med, i) => (
                <motion.div
                  key={med._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
                  style={{
                    borderLeft: `4px solid ${med.isTaken ? "#4CAF50" : "#FF8C42"}`,
                    opacity: med.isTaken ? 0.85 : 1
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                        style={{
                          background: med.isTaken ? "#E8F5E9" : "#FFF3E0"
                        }}
                      >
                        {med.isTaken ? "✅" : "💊"}
                      </div>

                      {/* Info */}
                      <div>
                        <h3
                          className="font-bold text-gray-800"
                          style={{
                            fontFamily: "Playfair Display, serif",
                            textDecoration: med.isTaken ? "line-through" : "none",
                            color: med.isTaken ? "#aaa" : "#2d2d2d"
                          }}
                        >
                          {med.name}
                        </h3>
                        <p className="text-xs text-gray-400">{med.dosage} • {med.frequency}</p>

                        {/* Times */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {med.times?.map((t, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: "#F7F2EC", color: "#C4956A" }}
                            >
                              ⏰ {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: med.isTaken ? "#E8F5E9" : "#FFF3E0",
                        color: med.isTaken ? "#4CAF50" : "#FF8C42"
                      }}
                    >
                      {med.isTaken ? "Taken" : "Pending"}
                    </div>
                  </div>

                  {/* Notes */}
                  {med.notes ? (
                    <p className="text-xs text-gray-400 mt-2 ml-14">
                      📝 {med.notes}
                    </p>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}