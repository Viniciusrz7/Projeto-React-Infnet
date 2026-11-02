import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { ResponseAuth } from "../pages/login"
import { AUTH_KEY } from "../utils/storageKeys"

interface UseAuthType {
    token: string
    usuario: { id: number, nome: string, email: string }
    setAuthData: (data :ResponseAuth) => void
    clearUser: () => void
}

export const useAuth = create<UseAuthType>()(
    persist(
        (set) => ({
            token: "",
            usuario: { id: 0, nome: "", email: "" },
            setAuthData: (data) => set({ token: data.token, usuario: data.usuario }),
            clearUser: () => set({ token: "", usuario: { id: 0, nome: "", email: "" } })
        }),
        {
            name: AUTH_KEY,
            storage: createJSONStorage(() => localStorage)
        }
    )
)