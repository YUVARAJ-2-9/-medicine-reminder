import axios from "axios"

const API = axios.create({
  baseURL: "https://medicine-reminder-backend-o1cj.onrender.com/api"
  // ↑ Unga Render URL paste pannu! localhost illa!
})

API.interceptors.request.use((req) => {
  const stored = localStorage.getItem("user")
  if (stored) {
    try {
      const user = JSON.parse(stored)
      if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`
      }
    } catch {
      localStorage.removeItem("user")
    }
  }
  return req
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default API