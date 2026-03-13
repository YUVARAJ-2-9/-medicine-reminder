import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import API from "../utils/api"
import { toast } from "react-toastify"

export default function AddMedicine() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "Daily",
    times: ["08:00"],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    notes: ""
  })

  const frequencies = ["Daily", "Weekly", "Monthly", "As Needed"]

  const addTime = () => {
    if (form.times.length < 5) {
      setForm(p => ({ ...p, times: [...p.times, "08:00"] }))
    }
  }

  const removeTime = (i) => {
    if (form.times.length > 1) {
      setForm(p => ({ ...p, times: p.times.filter((_, idx) => idx !== i) }))
    }
  }

  const updateTime = (i, val) => {
    const newTimes = [...form.times]
    newTimes[i] = val
    setForm(p => ({ ...p, times: newTimes }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.dosage) {
      toast.error("Please fill name and dosage!")
      return
    }
    setLoading(true)
    try {
      await API.post("/medicines", form)
      toast.success("💊 Medicine added! Reminder set!")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add medicine!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "transparent" }}>
      <div className="max-w-md mx-auto px-4 pt-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "white" }}
          >
            ←
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800"
            style={{ fontFamily: "Playfair Display, serif" }}>
            Add Medicine
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm"
        >
          {/* Medicine Name */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              💊 Medicine Name *
            </label>
            <input
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Paracetamol"
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
            />
          </div>

          {/* Dosage */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              ⚗️ Dosage *
            </label>
            <input
              value={form.dosage}
              onChange={e => setForm(p => ({ ...p, dosage: e.target.value }))}
              placeholder="e.g. 500mg"
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
            />
          </div>

          {/* Frequency */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              🔄 Frequency *
            </label>
            <div className="flex gap-2 flex-wrap">
              {frequencies.map(f => (
                <motion.button
                  key={f}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setForm(p => ({ ...p, frequency: f }))}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: form.frequency === f ? "#C4956A" : "#F7F2EC",
                    color: form.frequency === f ? "white" : "#888"
                  }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              ⏰ Reminder Times *
            </label>
            {form.times.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2 mb-2"
              >
                <input
                  type="time"
                  value={t}
                  onChange={e => updateTime(i, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl border-2 outline-none text-gray-800"
                  style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
                />
                {form.times.length > 1 && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeTime(i)}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "#FFF0F0", color: "#EE5555" }}
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>
            ))}
            {form.times.length < 5 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addTime}
                className="w-full py-2.5 rounded-2xl text-sm font-semibold mt-1"
                style={{ background: "#F7F2EC", color: "#C4956A" }}
              >
                + Add Another Time
              </motion.button>
            )}
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              📅 Start Date *
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              📅 End Date (Optional)
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
            />
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              📝 Notes (Optional)
            </label>
            <textarea
              value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="e.g. Take after food"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none text-gray-800 resize-none"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg"
            style={{ background: loading ? "#ccc" : "linear-gradient(135deg, #C4956A, #8B6B4A)" }}
          >
            {loading ? "Adding..." : "💊 Add Medicine & Set Reminder"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}