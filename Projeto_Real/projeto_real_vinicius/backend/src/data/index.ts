import type { Produto, Usuario } from "../utils/types.js"
import produtosJson from "./produtos.json" with { type: "json" }
import usuariosJson from "./usuarios.json" with { type: "json" }

export const produtos: Produto[] = produtosJson
export const usuarios: Usuario[] = usuariosJson
