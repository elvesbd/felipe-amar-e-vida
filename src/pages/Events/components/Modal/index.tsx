import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { X, Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "../../../../components/Button"
import type { Event } from "../../../../lib/interfaces/events.interfaces"
import {
  getEventDate,
  getEventTitle,
  getEventTimeRange,
  getEventDescription,
  getEventFullDescription,
} from "../../../../lib/utils"
import ImageWithPlaceholder from "../../../../components/ImageWithPlaceholder"

interface EventModalProps {
  readonly event: Event | null
  readonly onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const { i18n } = useTranslation()
  const language = i18n.language as "pt" | "en"

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (event) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <ImageWithPlaceholder
            src={event.publicUrl || "/placeholder.svg"}
            alt={getEventTitle(event, language)}
            className="w-full h-64 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{getEventTitle(event, language)}</h2>

          {getEventDescription(event, language) && (
            <p className="text-gray-500 mb-4">{getEventDescription(event, language)}</p>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{getEventDate(event, language)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{getEventTimeRange(event)}</span>
            </div>

            <div className="flex items-center text-gray-600 md:col-span-2">
              <MapPin className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-justify">
              {getEventFullDescription(event, language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
