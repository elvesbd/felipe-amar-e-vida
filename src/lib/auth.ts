import Cookies from "js-cookie"

interface Tokens {
  accessToken: string
  refreshToken: string
}

// Configurações para os cookies
const ACCESS_TOKEN_KEY = "fa-vida-access-token"
const REFRESH_TOKEN_KEY = "fa-vida-refresh-token"
const COOKIE_OPTIONS = {
  expires: 7, // 7 dias
  secure: import.meta.env.PROD, // Secure em produção
  sameSite: "strict" as const,
  path: "/",
}

// Armazenar tokens em cookies
export function setTokens({ accessToken, refreshToken }: Tokens): void {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...COOKIE_OPTIONS,
    expires: 1, // 1 dia para o access token
  })

  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...COOKIE_OPTIONS,
    expires: 30, // 30 dias para o refresh token
  })
}

// Obter tokens dos cookies
export function getTokens(): Tokens {
  return {
    accessToken: Cookies.get(ACCESS_TOKEN_KEY) ?? "",
    refreshToken: Cookies.get(REFRESH_TOKEN_KEY) ?? "",
  }
}

// Remover tokens dos cookies
export function removeTokens(): void {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" })
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" })
}

// Verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  return !!getTokens().accessToken
}
