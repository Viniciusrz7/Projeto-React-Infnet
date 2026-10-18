import "./styles.css"

import { useNavigate } from "react-router"


interface ProdutoProps {
    product: {
        "nome": string,
        "fabricante": string,
        "preco": number,
        "imagem": string
    }
}

export default function Produto({ product }: ProdutoProps) {

    const {  nome, fabricante, preco, imagem } = product;
    const navigate = useNavigate();

    function onNavigate() {
        navigate("/produto")
    }

    return (
        <div className="container-product" onClick={onNavigate}>

            <h2>{nome}</h2>

            <div className="container-img">
                <img src={imagem} alt={nome} />
            </div>

            <p className="fabricante">{fabricante}</p>
            <p className="preco">R$ {preco.toFixed(2).replace('.', ',')}</p>
        </div>
    )
}