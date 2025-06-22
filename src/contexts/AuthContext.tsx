import { createContext, useState, useEffect, useCallback, useMemo } from "react"

import { api, refreshAccessToken } from "../lib/api"
import type { User } from "./interfaces/user.interface"
import { getTokens, removeTokens, setTokens } from "../lib/auth"
import type { AuthContextProps } from "./interfaces/auth-context.interface"
import type { AuthProviderProps } from "./interfaces/auth-provider.interface"


export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => { },
  signOut: () => { },
})

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const loadUserFromTokens = async () => {
      try {
        const tokens = getTokens()

        if (!tokens.accessToken) {
          setIsLoading(false)
          return
        }

        // Verificar se o token está válido fazendo uma requisição para obter dados do usuário
        const response = await api.get("/profile")
        setUser(response.data)
      } catch {
        // Se o token estiver expirado, tenta fazer refresh
        try {
          await refreshAccessToken()
          const response = await api.get("/profile")
          setUser(response.data)
        } catch {
          removeTokens()
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromTokens()
  }, [])

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    const response = await api.post("/sign-in", credentials)
    const { accessToken, refreshToken, user: userData } = response.data

    setTokens({ accessToken, refreshToken })
    setUser(userData)
  }, [])

  const signOut = useCallback(() => {
    removeTokens()
    setUser(null)
  }, [])

  const authContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signOut,
    }),
    [user, isLoading, signIn, signOut]
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
