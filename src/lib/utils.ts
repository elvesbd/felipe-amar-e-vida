import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { GalleryPhoto } from "../pages/Gallery/interfaces/photo.interface"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAltText(photo: GalleryPhoto, language: string) {
  return language === "pt" ? photo.altTextPt : photo.altTextEn
}


export async function downloadFileFromUrl(
  url: string,
  filename?: string
): Promise<void> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Erro ao buscar o arquivo")

    const blob = await response.blob()
    const contentType = response.headers.get("Content-Type")
    const extension = contentType?.split("/")[1] ?? "bin"
    const finalName = filename ?? `download.${extension}`

    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = objectUrl
    link.download = finalName
    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error("Erro ao fazer download do arquivo:", error)
  }
}
