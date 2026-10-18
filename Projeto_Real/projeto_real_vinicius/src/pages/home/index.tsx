import Container from "../../templates/container"
import Produto from "../../components/product"
import "./styles.css"
import { dados_produtos } from "../home/dados_produtos"


export default function Home() {
    return (
        <div>
            <Container>
                <h1>Produtos</h1>
                <div className="home-content-list">
                    {dados_produtos.map((produto) => <Produto key={produto.id} product={produto} />)}
                </div>
            </Container>

        </div>
    )
}