import axios from 'axios'

import { ApiError } from '../utils/errors.ts'

const isDevelopment = import.meta.env.MODE === 'development'
const hostname = window.location.hostname

let baseURL =
    hostname === 'localhost'
        ? import.meta.env.VITE_API_URL_LOCAL
        : import.meta.env.VITE_API_URL_NETWORK

if (!isDevelopment) {
    baseURL = import.meta.env.VITE_API_URL
}

export const BASE_URL = baseURL?.replace(/\/api\/.*$/, '') ?? 'http://localhost:5143'

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
        const data = error.response?.data
        const message = data?.detail ?? data?.title ?? 'Something went wrong'
        const status = data?.status ?? error.response?.status
        return Promise.reject(new ApiError(message, status))
    }
)

export default api
