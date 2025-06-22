import axios, { type AxiosError, type AxiosRequestConfig } from "axios"

import { getTokens, removeTokens, setTokens } from "./auth"
import type {
  DeletePhotoResponse,
  GalleryPhotoResponse,
  RegisterPhotoData,
  RegisterPhotoResponse
} from "../pages/Gallery/interfaces/photo.interface"

export interface PreSignedUrlResponse {
  signedURL: string
  publicURL: string
}

// Cria uma instância do axios com a URL base da API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Variável para controlar se já está fazendo refresh
let isRefreshing = false
// Fila de requisições que falharam por token expirado
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}[] = []

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para lidar com respostas e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalConfig = error.config as AxiosRequestConfig

      // Verifica se não é uma requisição de refresh
      if (!originalConfig.url?.includes("/auth/refresh-token") && !isRefreshing) {
        isRefreshing = true

        try {
          const newToken = await refreshAccessToken()

          // Processa a fila de requisições que falharam
          failedRequestsQueue.forEach((request) => {
            request.onSuccess(newToken)
          })

          // Refaz a requisição original com o novo token
          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${newToken}`,
          }

          return api(originalConfig)
        } catch (refreshError) {
          // Notifica todas as requisições na fila que o refresh falhou
          failedRequestsQueue.forEach((request) => {
            request.onFailure(refreshError as AxiosError)
          })

          // Redireciona para login
          removeTokens()
          window.location.href = "/login"

          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
          failedRequestsQueue = []
        }
      }

      // Se já estiver fazendo refresh, adiciona a requisição à fila
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers = {
                ...originalConfig.headers,
                Authorization: `Bearer ${token}`,
              }

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
    }

    return Promise.reject(error)
  },
)

export async function refreshAccessToken(): Promise<string> {
  const { refreshToken } = getTokens()

  if (!refreshToken) {
    throw new Error("Refresh token não encontrado")
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, { refreshToken })

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

    setTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken ?? refreshToken,
    })

    return newAccessToken
  } catch (error) {
    removeTokens()
    throw error
  }
}

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const response = await api.post("/sign-in", { email, password })
    return response.data
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    throw error
  }
}

export async function getGalleryPhotos() {
  try {
    const { data: { photos } } = await api.get<GalleryPhotoResponse>("/galery-photos")
    return photos;
  } catch (error) {
    console.error("Erro ao buscar fotos da galeria:", error)
    throw error
  }
}

export async function registerPhoto(data: RegisterPhotoData) {
  try {
    return await api.post<RegisterPhotoResponse>("/register-photo", data)
  } catch (error) {
    console.error("Erro ao registrar foto:", error)
    throw error
  }
}

export async function deletePhoto(photoId: string) {
  try {
    return await api.delete<DeletePhotoResponse>(`/photo/${photoId}`)
  } catch (error) {
    console.error("Erro ao apagar foto:", error)
    throw error
  }
}

export async function getPreSignedUrl(file: File) {
  try {
    const { data } = await api.post<PreSignedUrlResponse>("/get-pre-signed-url", {
      fileName: file.name,
    })

    return {
      signedURL: data.signedURL,
      publicURL: data.publicURL
    }
  } catch (error) {
    console.error("Erro ao obter pre-signed URL:", error)
    throw error
  }
}

export function formatarDinheiro(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}


export function formatarData(dataString: string): string {
  const data = new Date(dataString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data)
}

