import './styles.css'
//import { useContext } from 'react';
//import { CartContextInstance } from '../../contexts/cartContext';
import { useCart } from "../../hooks/useCart";

export default function Cart() {
    //  const { items, clearCart } = useContext(CartContextInstance);

    const { items, clearCart } = useCart();
    return (
        <div className="cart">
            <button className="clear-cart-button" onClick={clearCart}>Limpar Carrinho</button>
            {items.length === 0 ? (
                <p className='empty-cart-message'>O carrinho está vazio</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <img src={item.imagem} alt={item.nome} />
                            <div>
                                <h4>{item.nome}</h4>
                                <p>{item.fabricante}</p>
                                <p>R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}