import { useEffect } from "react"
import { X, Trash2, Download } from "lucide-react"

import { Button } from "../../../../../components/Button"
import { downloadFileFromUrl } from "../../../../../lib/utils"
import type { GalleryPhoto } from "../../../../../lib/interfaces/photos.interfaces"
import ImageWithPlaceholder from "../../../../../components/ImageWithPlaceholder"


interface PhotoViewModalProps {
  readonly photo: GalleryPhoto | null
  readonly onClose: () => void
  readonly onDelete: (photo: GalleryPhoto) => void
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
    if (photo) downloadFileFromUrl(photo.publicUrl, `${photo.id}`)
  }

  if (!photo) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

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

        <div className="relative max-w-full max-h-full">
          <ImageWithPlaceholder
            src={photo.publicUrl || "/placeholder.svg"}
            alt={photo.altTextPt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
