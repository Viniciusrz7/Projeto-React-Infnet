import Container from "../../templates/container"
import Produto from "../../components/product"
import "./styles.css"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import type { ProdutoResponse } from "../home/types"
interface ListaProdutosResponse {
    produtos: Array<ProdutoResponse>
}

export default function Home() {

    async function getProdutos() {
        const response = await axios.get<ListaProdutosResponse>('http://localhost:3001/public/produtos')
        return response.data

    }

    const query = useQuery({ queryKey: ['produtos'], queryFn: getProdutos, staleTime: 1000 * 60 * 5 })

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