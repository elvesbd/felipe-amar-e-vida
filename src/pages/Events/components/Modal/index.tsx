"use client"

import { useEffect } from "react"
import { X, Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "../../../../components/Button"

interface Event {
  id: number
  title: {
    pt: string
    en: string
  }
  description: {
    pt: string
    en: string
  }
  date: {
    pt: string
    en: string
  }
  time: string
  location: string
  category: string
  status: "upcoming" | "ongoing" | "completed"
  image: string
  fullDescription?: {
    pt: string
    en: string
  }
}

interface EventModalProps {
  event: Event | null
  onClose: () => void
  language: "pt" | "en"
}

export default function EventModal({ event, onClose, language }: EventModalProps) {
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
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title[language]}
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
          <h2 className="text-2xl font-bold mb-4">{event.title[language]}</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{event.date[language]}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center text-gray-600 md:col-span-2">
              <MapPin className="h-5 w-5 mr-3 text-[#63A6DC]" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {event.fullDescription ? event.fullDescription[language] : event.description[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
