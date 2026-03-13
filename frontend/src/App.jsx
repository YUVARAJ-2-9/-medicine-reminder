import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddMedicine from "./pages/AddMedicine"
import History from "./pages/History"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import PageTransition from "./components/PageTransition"
import BgPattern from "./components/BgPattern"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <>
      {/* Background - always visible ALL pages */}
      <BgPattern />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        toastClassName="rounded-2xl font-semibold"
      />

      {user && <Navbar />}

      <div style={{ position: "relative", zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={
              <PageTransition><Login /></PageTransition>
            } />
            <Route path="/register" element={
              <PageTransition><Register /></PageTransition>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <PageTransition><Dashboard /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute>
                <PageTransition><AddMedicine /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <PageTransition><History /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <PageTransition><Profile /></PageTransition>
              </ProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}