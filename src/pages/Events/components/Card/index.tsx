import { useTranslation } from "react-i18next"
import { Calendar, Clock, MapPin } from "lucide-react"

import type { Event } from "../../../../lib/interfaces/events.interfaces"
import ImageWithPlaceholder from "../../../../components/ImageWithPlaceholder"
import { getEventDate, getEventTimeRange, getEventTitle } from "../../../../lib/utils"


interface EventCardProps {
  readonly event: Event
  readonly onClick: (event: Event) => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const { i18n } = useTranslation()
  const language = i18n.language as "pt" | "en"

  return (
    <button
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => onClick(event)}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithPlaceholder
          src={event.publicUrl || "/placeholder.svg"}
          alt={getEventTitle(event, language)}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#63A6DC] transition-colors">
          {getEventTitle(event, language)}
        </h3>


        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#63A6DC]" />
            <span>{getEventDate(event, language)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-[#63A6DC]" />
            <span>{getEventTimeRange(event)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-[#63A6DC]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
