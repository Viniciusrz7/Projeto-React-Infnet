import type { Request, Response } from "express"
import { LoginBody } from "../schemas/auth.schema.js"
import * as authService from "../services/auth.service.js"
import type { LoginResposta } from "../utils/types.js"

export async function login(req: Request, res: Response<LoginResposta>) {
    const { email, password } = LoginBody.parse(req.body)
    res.json(await authService.autenticarUsuario(email, password))
}
