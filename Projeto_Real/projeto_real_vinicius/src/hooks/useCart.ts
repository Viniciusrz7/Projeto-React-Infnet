import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CART_KEY } from "../utils/storageKeys"

interface ItemProps {
    id: number,
    nome: string,
    fabricante: string,
    preco: number,
    imagem: string
}

interface CartState {
    items: ItemProps[]
    addToCart: (item: ItemProps) => void
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
            clearCart: () => set({ items: [] })
        }),
        { name: CART_KEY }
    )
)
