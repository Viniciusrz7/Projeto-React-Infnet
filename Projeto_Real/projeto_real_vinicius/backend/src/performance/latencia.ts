import type { NextFunction, Request, Response } from "express"
import { setTimeout as esperar } from "node:timers/promises"

export function latencia(ms: number) {
    return async function (req: Request, res: Response, next: NextFunction) {
        await esperar(ms)
        next()
    }
}
