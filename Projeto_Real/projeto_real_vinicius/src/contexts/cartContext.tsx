import { createContext } from "react";
import { useState } from "react";
import { CART_KEY } from "../utils/storageKeys";

interface CartContextProps {
    items: {
        id: number,
        nome: string,
        fabricante: string,
        preco: number,
        imagem: string
    }[]
    addToCart: (item: itemProps) => void
    clearCart: () => void
}

interface ProviderProps {
    children: React.ReactNode;
}

interface itemProps {
    id: number,
    nome: string,
    fabricante: string,
    preco: number,
    imagem: string
}

export const CartContextInstance = createContext<CartContextProps>(null as any);

function loadCart(): itemProps[] {
    const dataStorageString = localStorage.getItem(CART_KEY)
    return dataStorageString ? JSON.parse(dataStorageString) : []
}

export default function CartContext({ children }: ProviderProps) {

    const [itemsCarts, setItensCarts] = useState<itemProps[]>(loadCart)

    function addToCart(item: itemProps) {
        const carrinhoAtualizado = [...itemsCarts, item]
        setItensCarts(carrinhoAtualizado)
        localStorage.setItem(CART_KEY, JSON.stringify(carrinhoAtualizado))
    }

    function clearCart() {
        setItensCarts([])
        localStorage.removeItem(CART_KEY)
    }

    return (
        <CartContextInstance.Provider value={{ items: itemsCarts, addToCart: addToCart, clearCart: clearCart }}>
            {children}
        </CartContextInstance.Provider>
    )
}