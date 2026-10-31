import Cart from '../../components/Cart';
import Modal from '../../components/Modal';
import './styles.css'
import { useState, useContext } from 'react';
import { CartContextInstance } from '../../contexts/cartContext';
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {

    const [visibleModal, setVisibleModal] = useState(false)

    const {items} = useContext(CartContextInstance)

    return (
        <div className="container-content">
            <header className="container-header">
                <h1>Produtos-vini</h1>
                <nav >
                    <ul className="list-item">
                        <li>Produtos</li>
                        <li>Quem somos</li>
                        <li onClick={() => { setVisibleModal(true) }}>Carrinhos de compras ({items.length})</li>
                        <li>Sair</li>
                    </ul>
                </nav>
            </header>

            <div className="container-children">
                {children}
            </div>
            <footer className="container-footer">
                <p>Todos os direitos reservados</p>
            </footer>

            <Modal modalIsOpen={visibleModal} closeModal={() => { setVisibleModal(false) }}>
                <h3>Carrinho de Compras</h3>
                <Cart/>
            </Modal>
        </div>
    )
}