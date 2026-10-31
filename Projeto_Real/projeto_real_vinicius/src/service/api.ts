import axios from "axios"
import type { ResponseAuth } from "../pages/login"
import { USER_KEY } from "../utils/storageKeys"

export const api = axios.create({ baseURL: 'http://localhost:3001' })

const userData = localStorage.getItem(USER_KEY)
let token;

if (userData) {
    const dataJSON: ResponseAuth = JSON.parse(userData)
    token = dataJSON.token
} else {
    alert("Você não possui autorização para acessar essa pagina")
}

api.defaults.headers.common.Authorization = `Bearer ${token}`

