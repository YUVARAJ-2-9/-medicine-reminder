import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import API from "../utils/api"
import MedicineCard from "../components/MedicineCard"
import { toast } from "react-toastify"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return "Good Morning"
    if (h < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines")
      setMedicines(data)
    } catch {
      toast.error("Failed to load medicines!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  const taken = medicines.filter(m => m.isTaken).length
  const pending = medicines.filter(m => !m.isTaken).length
  const percent = medicines.length > 0 ? Math.round((taken / medicines.length) * 100) : 0

  const handleToggle = (updated) => {
    setMedicines(prev => prev.map(m => m._id === updated._id ? updated : m))
  }

  const handleDelete = (id) => {
    setMedicines(prev => prev.filter(m => m._id !== id))
  }

  const nextMedicine = medicines.find(m => !m.isTaken)

  return (
      <div className="min-h-screen pb-24" style={{ background: "transparent" }}> 
      <div className="max-w-md mx-auto px-4 pt-6">

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-6 text-white"
          style={{ background: "linear-gradient(135deg, #C4956A, #8B6B4A)" }}
        >
          <p className="text-sm opacity-80 mb-1">{getGreeting()},</p>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            {user?.name} 👋
          </h1>

          {nextMedicine ? (
            <p className="text-sm opacity-90 mb-4">
              Next: <strong>{nextMedicine.name}</strong> at {nextMedicine.times?.[0]}
            </p>
          ) : (
            <p className="text-sm opacity-90 mb-4">
              {medicines.length === 0 ? "No medicines added yet!" : "All medicines taken! 🎉"}
            </p>
          )}

          {/* Progress Bar */}
          <div className="bg-white bg-opacity-20 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 rounded-full bg-white"
            />
          </div>
          <p className="text-xs opacity-80">{taken}/{medicines.length} medicines taken today</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: medicines.length, emoji: "💊", color: "#C4956A" },
            { label: "Taken", value: taken, emoji: "✅", color: "#4CAF50" },
            { label: "Pending", value: pending, emoji: "⏳", color: "#FF8C42" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 text-center bg-white shadow-sm"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Medicine List */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>
            Today's Medicines
          </h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/add")}
            className="text-sm font-semibold px-4 py-1.5 rounded-full text-white"
            style={{ background: "#C4956A" }}
          >
            + Add
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-4xl inline-block"
            >
              💊
            </motion.div>
            <p className="text-gray-400 mt-3">Loading medicines...</p>
          </div>
        ) : medicines.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💊</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No medicines yet!</h3>
            <p className="text-gray-400 mb-6">Add your first medicine reminder</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/add")}
              className="px-8 py-3 rounded-full text-white font-semibold"
              style={{ background: "#C4956A" }}
            >
              + Add Medicine
            </motion.button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {medicines.map((med, i) => (
              <motion.div
                key={med._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                <MedicineCard
                  medicine={med}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}