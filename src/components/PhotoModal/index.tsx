import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "../Button"
import type { Photo } from "../../pages/Gallery/interfaces/photo.interface"
import { useTranslation } from "react-i18next"

interface PhotoModalProps {
  readonly photo: Photo | null
  readonly photos: Photo[]
  readonly onClose: () => void
  readonly onNext: () => void
  readonly onPrev: () => void
}

export default function PhotoModal({ photo, photos, onClose, onNext, onPrev }: PhotoModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }

    if (photo) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [photo, onClose, onNext, onPrev])

  if (!photo) return null

  const currentIndex = photos.findIndex((p) => p.id === photo.id)

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          onClick={onNext}
          disabled={currentIndex === photos.length - 1}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="relative max-w-full max-h-full">
          <img src={photo.publicUrl || "/placeholder.svg"} alt={photo.altText} className="max-w-full max-h-full object-contain" />

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white/80 text-sm">
              {currentIndex + 1} de {photos.length} • {t(`gallery.categories.${photo.category.toLowerCase()}`)}

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
