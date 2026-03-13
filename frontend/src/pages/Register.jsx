import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'
import { toast } from 'react-toastify'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await API.post('/auth/register', form)
      login(data)
      toast.success('Account created! 🎉')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your Name', icon: '👤' },
    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@email.com', icon: '📧' },
    { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••', icon: '🔒' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {[
        { x: '8%', y: '20%', w: 50, h: 22, rotate: 35, delay: 0 },
        { x: '82%', y: '15%', w: 34, h: 16, rotate: -20, delay: 0.4 },
        { x: '88%', y: '65%', w: 44, h: 20, rotate: 50, delay: 0.8 },
        { x: '3%', y: '70%', w: 28, h: 13, rotate: -40, delay: 1.2 },
      ].map((p, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, background: 'linear-gradient(135deg, #C4956A55, #A0845C33)', borderRadius: 50, pointerEvents: 'none' }}
          animate={{ y: [-6, 6, -6], rotate: p.rotate, opacity: [0.3, 0.5, 0.3] }}
          transition={{ delay: p.delay, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)',
          borderRadius: 28, padding: '40px 32px',
          width: '100%', maxWidth: 420,
          boxShadow: '0 20px 60px rgba(196,149,106,0.15), 0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(255,255,255,0.8)', position: 'relative', zIndex: 10
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ textAlign: 'center', marginBottom: 28 }}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #C4956A, #8B6B4A)', borderRadius: 22, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 8px 24px rgba(196,149,106,0.35)' }}
          >🌟</motion.div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#2d2d2d', margin: '0 0 6px', fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}>Create Account</h1>
          <p style={{ color: '#aaa', fontSize: 14, margin: 0 }}>Start your health journey today</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {fields.map(({ label, key, type, placeholder, icon }, i) => (
            <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#999', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, pointerEvents: 'none' }}>{icon}</span>
                <input
                  type={type} placeholder={placeholder} value={form[key]}
                  onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  required
                  style={{
                    width: '100%', background: focused === key ? '#FDF8F3' : '#F7F2EC',
                    border: `2px solid ${focused === key ? '#C4956A' : 'transparent'}`,
                    borderRadius: 14, padding: '13px 16px 13px 44px',
                    fontSize: 15, color: '#2d2d2d', outline: 'none',
                    boxSizing: 'border-box', transition: 'all 0.25s',
                    boxShadow: focused === key ? '0 0 0 3px rgba(196,149,106,0.2)' : 'none'
                  }}
                />
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit" disabled={loading}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(196,149,106,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #C4956A 0%, #8B6B4A 100%)',
              color: 'white', border: 'none', borderRadius: 16, padding: '16px',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 10, boxShadow: '0 8px 24px rgba(196,149,106,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }} />
            ) : <>Get Started 🎉</>}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#aaa' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#C4956A', fontWeight: 700, textDecoration: 'none' }}>Login →</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register