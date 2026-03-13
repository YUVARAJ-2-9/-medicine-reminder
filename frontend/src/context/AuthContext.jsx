import { createContext, useContext, useState, useEffect } from "react"
import API from "../utils/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch {
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password })
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await API.post("/auth/register", { name, email, password })
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "#F7F2EC" }}>
        <div className="text-5xl animate-bounce">💊</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)