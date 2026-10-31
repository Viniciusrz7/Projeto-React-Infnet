import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"
import { AppError } from "../errors/AppError.js"
import * as usuariosRepository from "../repositories/usuarios.repository.js"
import type { LoginResposta } from "../utils/types.js"

const saltRounds = 10
const hashFalso = bcrypt.hashSync("usuario-inexistente", saltRounds)

export async function autenticarUsuario(email: string, password: string): Promise<LoginResposta> {
    const usuario = usuariosRepository.buscarPorEmail(email)
    const match = await bcrypt.compare(password, usuario?.passwordHash ?? hashFalso)

    if (!usuario || !match) {
        throw new AppError("NAO_AUTENTICADO", "Usuário ou senha incorretos")
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "1h" })
    const { passwordHash: _, ...usuarioPublico } = usuario

    return { token, usuario: usuarioPublico }
}
