import { createContext } from "react"

import type { AuthContextProps } from "./interfaces/auth-context.interface"


export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => { },
  signOut: () => { },
})