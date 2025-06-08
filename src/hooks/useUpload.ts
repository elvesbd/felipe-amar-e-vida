"use client"

import { useState, useCallback } from "react"
import { uploadFileToS3 } from "../services/s3/getPresignedURL"

export interface UploadProgress {
  fileName: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  url?: string
  error?: string
}

export function useUpload() {
  const [uploads, setUploads] = useState<UploadProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const uploadFiles = useCallback(async (files: File[]): Promise<string[]> => {
    setIsUploading(true)

    // Inicializar estado dos uploads
    const initialUploads: UploadProgress[] = files.map((file) => ({
      fileName: file.name,
      progress: 0,
      status: "pending",
    }))

    setUploads(initialUploads)

    const uploadedUrls: string[] = []

    try {
      // Processar uploads sequencialmente para evitar sobrecarga
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Atualizar status para "uploading"
        setUploads((prev) =>
          prev.map((upload, index) => (index === i ? { ...upload, status: "uploading", progress: 50 } : upload)),
        )

        try {
          const fileUrl = await uploadFileToS3(file)
          uploadedUrls.push(fileUrl)

          // Atualizar status para "completed"
          setUploads((prev) =>
            prev.map((upload, index) =>
              index === i ? { ...upload, status: "completed", progress: 100, url: fileUrl } : upload,
            ),
          )
        } catch (error) {
          // Atualizar status para "error"
          setUploads((prev) =>
            prev.map((upload, index) =>
              index === i
                ? {
                  ...upload,
                  status: "error",
                  progress: 0,
                  error: error instanceof Error ? error.message : "Erro no upload",
                }
                : upload,
            ),
          )
        }
      }

      return uploadedUrls
    } finally {
      setIsUploading(false)
    }
  }, [])

  const resetUploads = useCallback(() => {
    setUploads([])
    setIsUploading(false)
  }, [])

  const removeUpload = useCallback((fileName: string) => {
    setUploads((prev) => prev.filter((upload) => upload.fileName !== fileName))
  }, [])

  return {
    uploads,
    isUploading,
    uploadFiles,
    resetUploads,
    removeUpload,
  }
}
