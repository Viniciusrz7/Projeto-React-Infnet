import { usuarios } from "../data/index.js"
import type { Usuario } from "../utils/types.js"

export function buscarPorEmail(email: string): Usuario | undefined {
    return usuarios.find((usuario) => usuario.email === email)
}
