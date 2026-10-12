interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface ProdutoProps {
    produto: Produto;
}
import "./styles.css";

export default function ProdutosList(props: ProdutoProps) {

    return (
        <div className="produto">
            <h1>Lista de Produtos</h1>
            <h4>{props.produto.nome}</h4>
            <p>Preço: {props.produto.preco}</p>
            <span>ID: {props.produto.id}</span>
        </div>
    )
}
