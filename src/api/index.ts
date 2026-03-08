import axios from 'axios'

import { ApiError } from '../utils/errors.ts'

const isDevelopment = import.meta.env.MODE === 'development'
const hostname = window.location.hostname

let baseURL = hostname === 'localhost'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL_NETWORK

if (!isDevelopment) {
  baseURL = import.meta.env.VITE_API_URL
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail
      || error.response?.data?.message
      || error.message
      || 'An error occurred'

    const statusCode = error.response?.status
    return Promise.reject(new ApiError(message, statusCode))
  }
)

export default api