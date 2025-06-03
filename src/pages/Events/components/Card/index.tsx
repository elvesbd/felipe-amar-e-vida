import { Calendar, Clock, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"

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
  category: {
    pt: string
    en: string
  }
  time: string
  location: string
  image: string
}

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
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#63A6DC] transition-colors">
          {event.title[language]}
        </h3>


        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#63A6DC]" />
            <span>{event.date[language]}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-[#63A6DC]" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#63A6DC]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
