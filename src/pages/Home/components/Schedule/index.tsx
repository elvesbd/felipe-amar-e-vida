import { useTranslation } from 'react-i18next'
import { Calendar, Clock, MapPin } from "lucide-react"

export default function Schedule() {
  const { t } = useTranslation()

  return (
    <section
      id="schedule"
      className="py-16 bg-gradient-to-br from-[#63A6DC] to-[#4A90C2] text-white w-full min-h-[50vh] flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 sm:px-8 md:px-4 text-center max-w-6xl relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{t("schedule.title")}</h2>
          <div className="w-24 h-1 bg-white/80 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-2 sm:px-0">
          <div className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{t("schedule.days")}</h3>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{t("schedule.time")}</h3>
            </div>
          </div>

          <div className="group">
            <a
              href="https://maps.app.goo.gl/LU8L8fQ1MhmB9EQc6"
              target="_blank"
              rel="noopener noreferrer"
              title="Localização"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{t("schedule.location")}</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}