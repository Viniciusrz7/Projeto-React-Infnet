import { produtos } from "../data/index.js"
import type { Produto } from "../utils/types.js"

export function listar(): Produto[] {
    return produtos
}

export function buscarPorId(id: number): Produto | undefined {
    return produtos.find((produto) => produto.id === id)
}

export function excluir(id: number): boolean {
    const indice = produtos.findIndex((produto) => produto.id === id)

    if (indice === -1) {
        return false
    }

    produtos.splice(indice, 1)
    return true
}
