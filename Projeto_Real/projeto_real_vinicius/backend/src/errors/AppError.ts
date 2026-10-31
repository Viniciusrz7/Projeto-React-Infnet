export type TipoErro = "NAO_ENCONTRADO" | "NAO_AUTENTICADO" | "ID_INVALIDO"

export class AppError extends Error {
    public readonly tipo: TipoErro

    constructor(tipo: TipoErro, description: string) {
        super(description)
        this.name = "AppError"
        this.tipo = tipo
    }
}
