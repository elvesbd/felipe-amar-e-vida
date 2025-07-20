import { X } from "lucide-react"
import { useEffect } from "react"

import { Button } from "../../../../../components/Button"
import ImageWithPlaceholder from "../../../../../components/ImageWithPlaceholder"
import type { GalleryPhoto } from "../../../../../lib/interfaces/photos.interfaces"


interface PhotoViewModalProps {
  readonly photo: GalleryPhoto | null
  readonly onClose: () => void
}

export default function PhotoViewModal({ photo, onClose }: PhotoViewModalProps) {
  console.log('photo', photo)
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

  if (!photo) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 min-h-screen">
      <div className="relative max-w-4xl max-h-[calc(100vh-2rem)] w-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 md:px-12">

        {/* Container da imagem com relative */}
        <div className="relative flex-1 flex items-center justify-center max-h-[90vh] w-full">

          {/* Botão fechar fica aqui dentro, absolute relativo ao container da imagem */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0.5 right-4 text-white hover:bg-white/20 z-10 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </Button>

          <ImageWithPlaceholder
            src={photo.publicUrl || "/placeholder.svg"}
            alt={photo.altTextPt}
            className="max-w-full max-h-[90vh] object-contain md:max-w-[80%]"
          />
        </div>
      </div>
    </div>


  )
}