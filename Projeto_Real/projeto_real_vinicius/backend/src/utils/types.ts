export interface Produto {
    id: number
    nome: string
    fabricante: string
    preco: number
    imagem: string
}

export interface Usuario {
    id: number
    nome: string
    email: string
    passwordHash: string
}

export interface LoginResposta {
    token: string
    usuario: Omit<Usuario, "passwordHash">
}

export interface ErroResposta {
    erro: string
}
