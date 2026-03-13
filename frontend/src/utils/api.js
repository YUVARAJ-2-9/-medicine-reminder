import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user')
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
  }
  return req
})

// Response error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API