import Container from "../../templates/container"
import Produto from "../../components/product"
import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import type { ProdutoResponse } from "../home/types"
import { api } from "../../service/api"

interface ListaProdutosResponse {
    produtos: Array<ProdutoResponse>
}

export default function Home() {

    async function getProdutos() {
        return (await api.get<ListaProdutosResponse>('/produtos')).data
    }

    const query = useQuery({ queryKey: ['produtos'], queryFn: getProdutos, staleTime: 1000 * 60 * 5, retry: false, refetchOnMount: 'always' })

    return (
        <div>
            <Container>
                <h1>Produtos</h1>
                <div className="home-content-list">
                    {query.isFetching ? (
                        <p>Carregando...</p>
                    ) : query.data?.produtos.length ? (
                        <>{query.data.produtos.map((produto) => <Produto key={produto.id} product={produto} />)}</>
                    ) : (
                        <p>Nenhum produto encontrado</p>
                    )}
                </div>
            </Container>
        </div>
    )
}