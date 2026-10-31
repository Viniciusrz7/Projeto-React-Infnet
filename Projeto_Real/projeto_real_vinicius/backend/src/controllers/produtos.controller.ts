import type { Request, Response } from "express"
import * as produtosService from "../services/produtos.service.js"
import type { Produto } from "../utils/types.js"

export function listar(req: Request, res: Response<{ produtos: Produto[] }>) {
    res.json({ produtos: produtosService.listar() })
}

export function buscar(req: Request, res: Response<Produto, { id: number }>) {
    res.json(produtosService.buscar(res.locals.id))
}

export function excluir(req: Request, res: Response<{ mensagem: string }, { id: number }>) {
    produtosService.excluir(res.locals.id)
    res.json({ mensagem: "Produto excluído" })
}
