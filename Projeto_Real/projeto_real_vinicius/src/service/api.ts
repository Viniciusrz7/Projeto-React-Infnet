import axios from "axios"
import type { ResponseAuth } from "../pages/login"
import { USER_KEY } from "../utils/storageKeys"

export const api = axios.create({ baseURL: 'http://localhost:3001' })

api.interceptors.request.use(function (config) {
    const userData = localStorage.getItem(USER_KEY)

    if (userData) {
        const dataJSON: ResponseAuth = JSON.parse(userData)
        config.headers.Authorization = `Bearer ${dataJSON.token}`
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response?.status === 401) {
        localStorage.removeItem(USER_KEY)
        window.location.href = "/"
    }

    return Promise.reject(error)
})
