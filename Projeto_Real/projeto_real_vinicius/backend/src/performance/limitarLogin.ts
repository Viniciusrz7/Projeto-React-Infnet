import type { NextFunction, Request, Response } from "express"
import { RateLimiterMemory, type RateLimiterRes } from "rate-limiter-flexible"
import type { ErroResposta } from "../utils/types.js"

const rateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 60 * 60 * 24,
})

export function limitarLogin(req: Request, res: Response<ErroResposta>, next: NextFunction) {
    rateLimiter.consume(req.ip ?? "")
        .then(() => {
            next()
        })
        .catch((rateLimiterRes: RateLimiterRes) => {
            res.set("Retry-After", String(Math.round(rateLimiterRes.msBeforeNext / 1000) || 1))
            res.status(429).json({ erro: "Muitas tentativas de login" })
        })
}
