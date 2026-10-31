import type { NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "express-jwt"
import * as z from "zod"
import { AppError, type TipoErro } from "./AppError.js"
import type { ErroResposta } from "../utils/types.js"

interface HttpError extends Error {
    status?: number
}

const statusPorTipo: Record<TipoErro, number> = {
    NAO_ENCONTRADO: 404,
    NAO_AUTENTICADO: 401,
    ID_INVALIDO: 400,
}

export function tratarErroDaAplicacao(err: Error, req: Request, res: Response<ErroResposta>, next: NextFunction) {
    if (err instanceof AppError) {
        const status = statusPorTipo[err.tipo]

        if (status === 401) {
            res.set("WWW-Authenticate", "Bearer")
        }
        res.status(status).json({ erro: err.message })
    } else {
        next(err)
    }
}

export function tratarErroDeValidacao(err: Error, req: Request, res: Response<ErroResposta>, next: NextFunction) {
    if (err instanceof z.ZodError) {
        res.status(422).json({ erro: "Dados inválidos" })
    } else {
        next(err)
    }
}

export function tratarErroDeToken(err: Error, req: Request, res: Response<ErroResposta>, next: NextFunction) {
    if (err instanceof UnauthorizedError) {
        if (err.code === "credentials_bad_format") {
            res.set("WWW-Authenticate", 'Bearer error="invalid_request"')
            res.status(400).json({ erro: "Formato esperado: Authorization: Bearer [token]" })
        } else if (err.code === "invalid_token" || err.code === "revoked_token") {
            res.set("WWW-Authenticate", 'Bearer error="invalid_token"')
            res.status(401).json({ erro: "Token inválido ou expirado" })
        } else {
            res.set("WWW-Authenticate", "Bearer")
            res.status(401).json({ erro: "Token não informado" })
        }
    } else {
        next(err)
    }
}

export function tratarErroGenerico(err: HttpError, req: Request, res: Response<ErroResposta>, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }

    const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500

    if (status < 500) {
        res.status(status).json({ erro: "Requisição inválida" })
    } else {
        console.error(err.stack)
        res.status(status).json({ erro: "Algo deu errado!" })
    }
}
