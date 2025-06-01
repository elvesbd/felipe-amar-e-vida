import { Calendar, Clock, MapPin } from "lucide-react"

interface ScheduleProps {
  readonly content: any
}

export default function Schedule({ content }: ScheduleProps) {
  return (
    <section id="schedule" className="py-16 bg-[#63A6DC] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{content.schedule.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{content.schedule.days}</h3>
          </div>
          <div>
            <Clock className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{content.schedule.time}</h3>
          </div>
          <div>
            <MapPin className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{content.schedule.location}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}