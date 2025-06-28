import type { User } from "./user.interface"

export interface AuthContextProps {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => void
  signIn: (credentials: { email: string; password: string }) => Promise<void>
}
