import axios from "axios"

const LAMBDA_URL = import.meta.env.VITE_LAMBDA_PRESIGNED_URL ?? ""

export interface PreSignedUrlResponse {
  signedURL: string
  publicURL: string
}

export const getPreSignedUrl = async (file: File): Promise<PreSignedUrlResponse> => {
  try {
    const { data } = await axios.post<PreSignedUrlResponse>(LAMBDA_URL, {
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
