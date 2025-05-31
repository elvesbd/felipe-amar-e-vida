"use client"

import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../Button"

interface Photo {
  id: number
  src: string
  alt: string
  category: string
}

interface PhotoModalProps {
  photo: Photo | null
  photos: Photo[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function PhotoModal({ photo, photos, onClose, onNext, onPrev }: PhotoModalProps) {
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
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          onClick={onNext}
          disabled={currentIndex === photos.length - 1}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Image */}
        <div className="relative max-w-full max-h-full">
          <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="max-w-full max-h-full object-contain" />

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-lg font-semibold mb-1">{photo.alt}</h3>
            <p className="text-white/80 text-sm">
              {currentIndex + 1} de {photos.length} • {photo.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
