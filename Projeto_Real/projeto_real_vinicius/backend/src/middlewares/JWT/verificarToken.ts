import { expressjwt } from "express-jwt"
import { JWT_SECRET } from "../../config/config.js"

export const verificarToken = expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] })
