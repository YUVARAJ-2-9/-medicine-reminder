import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const floatingItems = [
    { emoji: "💊", x: "10%", delay: 0, duration: 3 },
    { emoji: "🩺", x: "80%", delay: 0.5, duration: 4 },
    { emoji: "💉", x: "60%", delay: 1, duration: 3.5 },
    { emoji: "🏥", x: "30%", delay: 1.5, duration: 5 },
    { emoji: "⚕️", x: "90%", delay: 0.8, duration: 4.5 },
    { emoji: "💊", x: "50%", delay: 2, duration: 3.2 },
  ]

  const handleLogin = async (e) => {
    e?.preventDefault()
    if (!email || !password) {
      toast.error("Please fill all fields!")
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      toast.success("Welcome back! 👋")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "transparent" }}>

      {/* Floating Background Emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="fixed text-3xl pointer-events-none select-none"
          style={{ left: item.x, top: "-10%" }}
          animate={{ y: ["0vh", "110vh"] }}
          transition={{
            duration: item.duration * 3,
            repeat: Infinity,
            delay: item.delay * 2,
            ease: "linear"
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-6xl mb-3"
          >
            💊
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Playfair Display, serif" }}>
            MedReminder
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Your health companion</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-6 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)"
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-5"
            style={{ fontFamily: "Playfair Display, serif" }}>
            Welcome Back 👋
          </h2>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <label className="text-sm font-semibold text-gray-500 mb-1.5 block">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none transition-all text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
              onFocus={e => e.target.style.borderColor = "#C4956A"}
              onBlur={e => e.target.style.borderColor = "#EDE4D8"}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="text-sm font-semibold text-gray-500 mb-1.5 block">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none transition-all text-gray-800"
              style={{ borderColor: "#EDE4D8", background: "#FDFAF7" }}
              onFocus={e => e.target.style.borderColor = "#C4956A"}
              onBlur={e => e.target.style.borderColor = "#EDE4D8"}
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4"
            style={{
              background: loading ? "#ccc" : "linear-gradient(135deg, #C4956A, #8B6B4A)"
            }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Logging in...
              </motion.span>
            ) : "Login →"}
          </motion.button>

          <p className="text-center text-sm text-gray-400">
            Register Here?{" "}
            <Link to="/register"
              className="font-semibold"
              style={{ color: "#C4956A" }}>
              Register here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}