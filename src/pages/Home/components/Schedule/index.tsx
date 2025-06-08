import { useTranslation } from 'react-i18next'
import { Calendar, Clock, MapPin } from "lucide-react"

export default function Schedule() {
  const { t } = useTranslation()

  return (
    <section id="schedule" className="py-16 bg-[#63A6DC] text-white w-full min-h-[50vh] flex items-center">
      <div className="container mx-auto px-4 text-center max-w-full">
        <h2 className="text-3xl font-bold mb-8">{t('schedule.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('schedule.days')}</h3>
          </div>
          <div>
            <Clock className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('schedule.time')}</h3>
          </div>
          <div>
            <MapPin className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('schedule.location')}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}