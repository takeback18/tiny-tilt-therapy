import { createContext } from 'react'

export interface StoreUser {
  id: string
  email: string
}

export interface AuthContextValue {
  user: StoreUser | null
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

export const STORE_WORKER_URL: string = import.meta.env.VITE_STORE_WORKER_URL ?? ''

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
