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
  response => response,
  error => {
    const data = error.response?.data
    const message = data?.detail ?? data?.title ?? 'Something went wrong'
    const status = data?.status ?? error.response?.status

    const apiError = new ApiError(message, status)
    return Promise.reject(apiError)
  }
)

export default api