import axios from "axios"

export const uploadToS3 = async (url: string, file: File): Promise<void> => {
  try {
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
  } catch (error) {
    console.error("Erro ao fazer upload para S3:", error)
    throw error
  }
}
