import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, STORE_WORKER_URL } from './auth-context'
import type { StoreUser } from './auth-context'

async function fetchCurrentUser(): Promise<StoreUser | null> {
  try {
    const res = await fetch(`${STORE_WORKER_URL}/auth/me`, { credentials: 'include' })
    if (!res.ok) return null
    const data = (await res.json()) as { user: StoreUser }
    return data.user
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoreUser | null>(null)
  const [loading, setLoading] = useState(() => Boolean(STORE_WORKER_URL))

  // Manual re-check, e.g. right after a login/signup form succeeds.
  const refresh = useCallback(async () => {
    if (!STORE_WORKER_URL) return
    setUser(await fetchCurrentUser())
  }, [])

  useEffect(() => {
    if (!STORE_WORKER_URL) return
    fetchCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  async function logout() {
    if (!STORE_WORKER_URL) return
    await fetch(`${STORE_WORKER_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
