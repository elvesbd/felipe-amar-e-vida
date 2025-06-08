import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import EventCard from "./components/Card"
import EventModal from "./components/Modal"
import Header from "../../components/Header"
import Footer from "../Home/components/Footer"
import { Button } from "../../components/Button"
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
  time: string
  location: string
  category: {
    pt: string
    en: string
  }
  image: string
  fullDescription?: {
    pt: string
    en: string
  }
}

export default function EventsPage() {
  const eventsPerPage = 6
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allEvents: Event[] = [
    {
      id: 1,
      title: {
        pt: "Aula Especial de Surfe Adaptado",
        en: "Special Adaptive Surf Class",
      },
      description: {
        pt: "Esta aula especial será dedicada ao desenvolvimento de técnicas avançadas de surfe adaptado, com foco especial em pessoas com deficiência visual. Contaremos com instrutores especializados e equipamentos adaptados para garantir uma experiência segura e enriquecedora para todos os participantes.",
        en: "This special class will be dedicated to developing advanced adaptive surfing techniques, with a special focus on people with visual impairments. We will have specialized instructors and adapted equipment to ensure a safe and enriching experience for all participants.",
      },
      date: {
        pt: "15 de Janeiro, 2024",
        en: "January 15, 2024",
      },
      time: "14h45 - 17h00",
      location: "PF Surf School - Praia do Futuro",
      category: {
        pt: "Aulas Especiais",
        en: "Special Classes",
      },
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    }
  ]

  const totalPages = Math.ceil(allEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = allEvents.slice(startIndex, startIndex + eventsPerPage)

  const openModal = (event: Event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
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
    </div>
  )
}
