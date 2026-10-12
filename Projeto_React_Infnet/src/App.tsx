import Header from "./components/header"
import Footer from "./components/footer"
import Container from "./components/container"
import { useState } from "react"
import ProdutosList from "./components/produtos-list"

const produtos = [
    {
        id: 1,
        nome: "Produto 1",
        descricao: "Descrição do produto 1",
        preco: 100.0
    },
    {
        id: 2,
        nome: "Produto 2",
        descricao: "Descrição do produto 2",
        preco: 200.0
    }
]

export default function App() {

    const [contador, setContador] = useState(0);

    function incrementar() {
        setContador(contador + 1);
    }

    return (
        <div className="">
            <Header />

            {produtos.map((produto) => {
                return (
                    <ProdutosList key={Date.now() + produto.id} produto={produto} />
                )
            })}
            
            <button onClick={incrementar}>Incrementar contador</button>
            <Container incrementar={incrementar} contador={contador} color="lightgray" title="Conteúdo 1" text="Texto do conteúdo 1" />
            <Container contador={contador} color="lightblue" title="Conteúdo 2" text="Texto do conteúdo 2" />
            <Container contador={contador} color="lightgreen" title="Conteúdo 3" text="Texto do conteúdo 3" />
            <Container setContador={setContador} contador={contador} color="lightyellow" title="Conteúdo 4" />

            <Footer />
        </div>
    )
}
