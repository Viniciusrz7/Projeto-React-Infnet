import Cart from '../../components/Cart';
import Modal from '../../components/Modal';
import {useNavigate} from "react-router"
import './styles.css'
import { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
//import { CartContextInstance } from '../../contexts/cartContext';
import { useCart } from "../../hooks/useCart";
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {

    const [visibleModal, setVisibleModal] = useState(false)
    const totalItens = useCart((state) => state.items.length)
    //const {items} = useContext(CartContextInstance)
    const { clearUser } = useAuth();
    const navigate = useNavigate();

    function logout() {
        clearUser();
        navigate("/",{replace:true});
    }

    return (
        <div className="container-content">
            <header className="container-header">
                <h1>Produtos-vini</h1>
                <nav >
                    <ul className="list-item">
                        <li>Produtos</li>
                        <li>Quem somos</li>
                        <li onClick={() => { setVisibleModal(true) }}>Carrinhos de compras ({totalItens})</li>
                        <li onClick={logout}>Sair</li>
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
                <Cart />
            </Modal>
        </div>
    )
}