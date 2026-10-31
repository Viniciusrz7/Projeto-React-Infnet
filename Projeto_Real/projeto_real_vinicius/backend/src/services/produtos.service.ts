import { LRUCache } from "lru-cache"
import { AppError } from "../errors/AppError.js"
import * as produtosRepository from "../repositories/produtos.repository.js"
import type { Produto } from "../utils/types.js"

const options = {
    max: 500,
    ttl: 1000 * 60 * 5,
}

const listaCache = new LRUCache<string, Produto[]>(options)
const produtoCache = new LRUCache<number, Produto>(options)

export function listar(): Produto[] {
    const emCache = listaCache.get("produtos")

    if (emCache) {
        return emCache
    }

    const produtos = produtosRepository.listar()
    listaCache.set("produtos", produtos)

    return produtos
}

export function buscar(id: number): Produto {
    const emCache = produtoCache.get(id)

    if (emCache) {
        return emCache
    }

    const produto = produtosRepository.buscarPorId(id)

    if (!produto) {
        throw new AppError("NAO_ENCONTRADO", "Produto não encontrado")
    }

    produtoCache.set(id, produto)

    return produto
}

export function excluir(id: number): void {
    const excluido = produtosRepository.excluir(id)

    if (!excluido) {
        throw new AppError("NAO_ENCONTRADO", "Produto não encontrado")
    }

    produtoCache.delete(id)
    listaCache.delete("produtos")
}
