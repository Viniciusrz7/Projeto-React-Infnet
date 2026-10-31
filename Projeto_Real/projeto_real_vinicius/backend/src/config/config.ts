export const PORT = Number(process.env.PORT ?? 3001)
export const ORIGEM_PERMITIDA = process.env.ORIGEM_PERMITIDA ?? "http://localhost:5173"
export const LATENCIA_MS = Number(process.env.LATENCIA_MS ?? 0)

if (!process.env.JWT_SECRET) {
    throw new Error("Defina JWT_SECRET no arquivo .env")
}

export const JWT_SECRET = process.env.JWT_SECRET
