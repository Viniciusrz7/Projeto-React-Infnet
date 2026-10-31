import { createServer } from "node:http"
import { readFile } from "node:fs/promises"

const PORT = 3001
const ORIGEM_PERMITIDA = "http://localhost:5173"
const LATENCIA_MS = Number(process.argv[2] ?? 0)

// ---------- Dados ----------

const carregarJson = async (arquivo) =>
    JSON.parse(await readFile(new URL(arquivo, import.meta.url), "utf-8"))

const produtos = await carregarJson("./produtos.json")
const usuarios = await carregarJson("./usuarios.json")

// ---------- Utilitários HTTP ----------

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function enviarJson(res, status, corpo) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": ORIGEM_PERMITIDA,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    })
    res.end(JSON.stringify(corpo))
}

async function lerCorpo(req) {
    let texto = ""
    for await (const pedaco of req) texto += pedaco

    try {
        return JSON.parse(texto)
    } catch {
        return {}
    }
}

// ---------- Handlers ----------

async function login(req, res) {
    const { email, password } = await lerCorpo(req)
    const usuario = usuarios.find((u) => u.email === email && u.password === password)

    if (!usuario) {
        return enviarJson(res, 401, { erro: "Usuário ou senha incorretos" })
    }

    const { password: _, ...usuarioPublico } = usuario
    const token = Buffer.from(`${usuario.id}:${Date.now()}`).toString("base64")

    enviarJson(res, 200, { token, usuario: usuarioPublico })
}

function listarProdutos(req, res) {
    enviarJson(res, 200, { produtos })
}

function buscarProduto(req, res, id) {
    const produto = produtos.find((p) => p.id === Number(id))

    if (!produto) {
        return enviarJson(res, 404, { erro: "Produto não encontrado" })
    }

    enviarJson(res, 200, produto)
}

function excluirProduto(req, res, id) {
    const indice = produtos.findIndex((p) => p.id === Number(id))

    if (indice === -1) {
        return enviarJson(res, 404, { erro: "Produto não encontrado" })
    }

    produtos.splice(indice, 1)
    enviarJson(res, 200, { mensagem: "Produto excluído" })
}

// ---------- Rotas ----------

const rotas = [
    { metodo: "POST", caminho: /^\/auth\/login$/, handler: login },
    { metodo: "GET", caminho: /^\/produtos$/, handler: listarProdutos },
    { metodo: "GET", caminho: /^\/produtos\/(\d+)$/, handler: buscarProduto },
    { metodo: "DELETE", caminho: /^\/produtos\/(\d+)$/, handler: excluirProduto },
]

async function tratarRequisicao(req, res) {
    await esperar(LATENCIA_MS)

    if (req.method === "OPTIONS") {
        return enviarJson(res, 204, null)
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`)

    for (const { metodo, caminho, handler } of rotas) {
        const correspondencia = req.method === metodo && pathname.match(caminho)
        if (correspondencia) {
            return handler(req, res, ...correspondencia.slice(1))
        }
    }

    enviarJson(res, 404, { erro: "Rota não encontrada" })
}

// ---------- Servidor ----------

createServer(tratarRequisicao).listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`)
})
