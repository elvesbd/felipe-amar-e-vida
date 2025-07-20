import { toast } from "react-toastify"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import EventCard from "./components/Card"
import { getEvents } from "../../lib/api"
import EventModal from "./components/Modal"
import Header from "../../components/Header"
import Footer from "../Home/components/Footer"
import { Button } from "../../components/Button"
import { useFullPageLoader } from "../../hooks/useFullPageLoader"
import type { Event } from "../../lib/interfaces/events.interfaces"

export default function EventsPage() {
  const eventsPerPage = 6
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showLoader, hideLoader, Loader } = useFullPageLoader()

  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      try {
        showLoader()
        setIsLoading(true)
        const response = await getEvents()
        setEvents(response)

        response.forEach((photo) => {
          if (photo.publicUrl) {
            const img = new Image()
            img.src = photo.publicUrl
          }
        })
      } catch (error) {
        console.error("Erro ao carregar eventos:", error)
        toast.error("Erro ao carregar eventos. Tente novamente mais tarde.")
      } finally {
        hideLoader()
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [hideLoader, showLoader])

  const totalPages = Math.ceil(events.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = events.slice(startIndex, startIndex + eventsPerPage)

  const openModal = (event: Event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  return (
    <>
      {Loader}

      <div className="flex flex-col min-h-screen">
        {!isLoading && (
          <>
            <Header />

            <div className="flex-grow">
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                  <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t("eventsPage.backToHome")}
                  </Button>
                </div>

                {currentEvents.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {currentEvents.map((event) => (
                        <EventCard key={event.id} event={event} onClick={openModal} />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          {t("eventsPage.previous")}
                        </Button>

                        <div className="flex space-x-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={currentPage === page ? "bg-[#63A6DC] hover:bg-[#4a8bc4]" : ""}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          {t("eventsPage.next")}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">{t("eventsPage.noEvents")}</p>
                  </div>
                )}
              </div>
            </div>

            <EventModal event={selectedEvent} onClose={closeModal} />

            <Footer />
          </>
        )}
      </div>
    </>
  )
}
