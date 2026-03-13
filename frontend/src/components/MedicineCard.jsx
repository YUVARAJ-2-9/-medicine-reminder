import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import API from "../utils/api"
import { toast } from "react-toastify"

export default function MedicineCard({ medicine, onToggle, onDelete }) {
  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    try {
      const { data } = await API.patch(`/medicines/${medicine._id}/toggle`)
      onToggle(data)
      toast.success(data.isTaken ? "✅ Marked as taken!" : "↩️ Marked as pending!")
    } catch {
      toast.error("Update failed!")
    } finally {
      setToggling(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await API.delete(`/medicines/${medicine._id}`)
      onDelete(medicine._id)
      toast.success("🗑️ Medicine deleted!")
    } catch {
      toast.error("Delete failed!")
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm border"
        style={{
          borderColor: medicine.isTaken ? "#4CAF50" : "#EDE4D8",
          opacity: medicine.isTaken ? 0.75 : 1
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: medicine.isTaken ? "#E8F5E9" : "#F7F2EC" }}
            >
              💊
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3
                className="font-bold text-gray-800 text-base"
                style={{
                  fontFamily: "Playfair Display, serif",
                  textDecoration: medicine.isTaken ? "line-through" : "none",
                  color: medicine.isTaken ? "#aaa" : "#2d2d2d"
                }}
              >
                {medicine.name}
              </h3>
              <p className="text-sm text-gray-400">{medicine.dosage}</p>

              {/* Times */}
              <div className="flex flex-wrap gap-1 mt-2">
                {medicine.times?.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "#F7F2EC",
                      color: "#C4956A"
                    }}
                  >
                    ⏰ {t}
                  </span>
                ))}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "#F7F2EC", color: "#888" }}
                >
                  {medicine.frequency}
                </span>
              </div>

              {medicine.notes ? (
                <p className="text-xs text-gray-400 mt-1">📝 {medicine.notes}</p>
              ) : null}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 ml-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggle}
              disabled={toggling}
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{
                background: medicine.isTaken ? "#4CAF50" : "#EDE4D8"
              }}
            >
              {toggling ? "⏳" : medicine.isTaken ? "✅" : "○"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowConfirm(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{ background: "#FFF0F0" }}
            >
              🗑️
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-xl"
            >
              <div className="text-5xl mb-3">🗑️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}>
                Delete Medicine?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                "{medicine.name}" will be permanently deleted!
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-2xl font-semibold text-gray-600"
                  style={{ background: "#F7F2EC" }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-2xl font-semibold text-white"
                  style={{ background: "#EE5555" }}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}