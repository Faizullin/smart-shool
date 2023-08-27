import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/IAuthResponse";

const default_uri = (window as any).BASE_API_URL
let TAPI_URL = ''
if (default_uri !== undefined) {
    TAPI_URL = default_uri + '/api'
} else if (import.meta.env.VITE_APP_BASE_URL !== undefined && import.meta.env.VITE_APP_BASE_URL !== null) {
    TAPI_URL = import.meta.env.VITE_APP_BASE_URL + '/api'
} else {
    TAPI_URL = '/api'
}
console.log("using ", TAPI_URL)
export const API_URL = TAPI_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
$api.interceptors.response.use((config: AxiosResponse) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        try {
            const refresh = localStorage.getItem('refreshToken') || ''
            if (refresh.length !== 0) {
                const response = await axios.post<AuthResponse>(`${API_URL}/token/refresh/`, {
                    refresh
                })
                localStorage.setItem('token', response.data.access)
                return $api.request(originalRequest);
            }
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            localStorage.removeItem('student')

        } catch (e) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            localStorage.removeItem('student')
        }
    }
    return Promise.reject(error)
})

export default $api;