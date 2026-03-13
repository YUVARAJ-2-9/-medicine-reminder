import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/history", icon: "📋", label: "History" },
    { path: "/add", icon: "➕", label: "Add" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4"
    >
      <div
        className="flex items-center gap-1 px-4 py-3 rounded-3xl shadow-xl"
        style={{ background: "#1a1a2e", backdropFilter: "blur(20px)" }}
      >
        {tabs.map((tab) => {
          const active = location.pathname === tab.path
          return (
            <motion.button
              key={tab.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center px-4 py-2 rounded-2xl transition-all"
              style={{
                background: active ? "#C4956A" : "transparent",
                minWidth: "60px"
              }}
            >
              <span className="text-xl">{tab.icon}</span>
              <span
                className="text-xs mt-0.5 font-semibold"
                style={{ color: active ? "white" : "#888" }}
              >
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}