import { useEffect } from "react"
import { X, Trash2, Download } from "lucide-react"
import { Button } from "../../../../../components/Button"
import type { Photo } from "../../../../Gallery/interfaces/photo.interface"

interface PhotoViewModalProps {
  readonly photo: Photo | null
  readonly onClose: () => void
  readonly onDelete: (photo: Photo) => void
}

export default function PhotoViewModal({ photo, onClose, onDelete }: PhotoViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (photo) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [photo, onClose])

  const handleDelete = () => {
    if (photo && window.confirm(`Tem certeza que deseja excluir a foto?`)) {
      onDelete(photo)
      onClose()
    }
  }

  const handleDownload = () => {
    if (photo) {
      // Simular download da imagem
      const link = document.createElement("a")
      link.href = photo.publicUrl
      link.download = `${photo.originalName}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!photo) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        {/* Botão Fechar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Ações */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-white hover:bg-red-500/20 backdrop-blur-sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>

        {/* Imagem */}
        <div className="relative max-w-full max-h-full">
          <img src={photo.publicUrl || "/placeholder.svg"} alt={photo.altText} className="max-w-full max-h-full object-contain" />

          {/* Informações da Foto */}
        </div>
      </div>
    </div>
  )
}
