import express from "express"
import { login } from "../controllers/auth.controller.js"
import { limitarLogin } from "../performance/limitarLogin.js"

const router = express.Router()

router.post("/login", limitarLogin, login)

export default router
