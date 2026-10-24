import { createServer } from "node:http"
import { readFile } from "node:fs/promises"

const PORT = 3001
const ORIGEM_PERMITIDA = "http://localhost:5173"
const LATENCIA_MS = Number(process.argv[2] ?? 0)

const produtos = JSON.parse(
    await readFile(new URL("./produtos.json", import.meta.url), "utf-8")
)

function enviarJson(res, status, corpo) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": ORIGEM_PERMITIDA,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    })
    res.end(JSON.stringify(corpo))
}

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const server = createServer(async (req, res) => {
    await esperar(LATENCIA_MS)

    const { pathname } = new URL(req.url, `http://${req.headers.host}`)

    if (req.method === "OPTIONS") return enviarJson(res, 204, null)

    if (req.method === "GET" && pathname === "/public/produtos") {
        return enviarJson(res, 200, { produtos })
    }

    const idProduto = pathname.match(/^\/public\/produtos\/(\d+)$/)?.[1]
    if (req.method === "GET" && idProduto) {
        const produto = produtos.find((p) => p.id === Number(idProduto))
        return produto
            ? enviarJson(res, 200, produto)
            : enviarJson(res, 404, { erro: "Produto não encontrado" })
    }

    enviarJson(res, 404, { erro: "Rota não encontrada" })
})

server.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`)
})
