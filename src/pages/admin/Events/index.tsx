import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Edit, Trash2, Calendar, Clock, MapPin, Search } from "lucide-react"

import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import { getEventTimeRange } from "../../../lib/utils"
import EventFormModal from "./components/EventsFormModal"
import type { Event, IEvent } from "../../../lib/interfaces/events.interfaces"
import { deleteEvent, getEvents, registerEvent, updateEvent } from "../../../lib/api"
import ImageWithPlaceholder from "../../../components/ImageWithPlaceholder"
import { useFullPageLoader } from "../../../hooks/useFullPageLoader"


export default function AdminEvents() {
  const navigate = useNavigate()
  const { showLoader, hideLoader, Loader } = useFullPageLoader()

  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
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

  useEffect(() => {
    fetchEvents()
  }, [])


  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.titlePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.descriptionPt.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch;
  })


  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleDelete = async (event: Event) => {
    try {
      const response = await deleteEvent(event.id)
      toast.success(response)

      fetchEvents()
    } catch (error) {
      toast.error("Erro ao deletar evento.")
      console.error("Erro ao deletar evento:", error)
    }
  }

  const handleCreateEvent = async (eventData: IEvent) => {
    if (editingEvent) {
      try {
        const response = await updateEvent(eventData)
        toast.success(response)
        handleCloseModal()

        fetchEvents()
      } catch (error) {
        toast.error("Erro ao atualizar evento.")
        console.error("Erro ao atualizar evento:", error)
      }
    } else {
      try {
        const response = await registerEvent(eventData)
        toast.success(response)
        handleCloseModal()

        fetchEvents()
      } catch (error) {
        toast.error("Erro ao cadastrar evento.")
        console.error("Erro ao criar evento:", error)
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  return (
    <>
      {Loader}

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
        {!isLoading && (
          <header className="bg-white shadow-sm border-0">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
              <div className="hidden md:flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin")}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>

                <img src="/logo-footer.png" alt="Felipe A Maré Vida" className="h-12 w-12" />

                <Button
                  onClick={() => {
                    setEditingEvent(null)
                    setIsModalOpen(true)
                  }}
                  className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 border-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Evento
                </Button>
              </div>

              {/* Layout Mobile */}
              <div className="flex md:hidden items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin")}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <img src="/logo-footer.png" alt="Felipe A Maré Vida" className="h-10 w-10" />

                <Button
                  onClick={() => {
                    setEditingEvent(null)
                    setIsModalOpen(true)
                  }}
                  size="sm"
                  className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 border-0 px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
        )}

        <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200"
              />
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border-0">
              <Calendar className="h-12 md:h-16 w-12 md:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchTerm ? "Nenhum evento encontrado" : "Nenhum evento cadastrado"}
              </h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                {searchTerm ? "Tente ajustar sua busca" : "Comece criando seu primeiro evento"}
              </p>
              <Button
                onClick={() => {
                  setEditingEvent(null)
                  setIsModalOpen(true)
                }}
                className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                {searchTerm ? "Criar Novo Evento" : "Criar Primeiro Evento"}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-64 h-48 md:h-auto">
                      <ImageWithPlaceholder
                        src={event.publicUrl || "/placeholder.svg"}
                        alt={event.titlePt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1 mb-4 md:mb-0">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{event.titlePt}</h3>
                          <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">{event.descriptionPt}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                            <div className="flex items-center text-xs md:text-sm text-gray-600">
                              <Calendar className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                              {event.isoDateBR}
                            </div>
                            <div className="flex items-center text-xs md:text-sm text-gray-600">
                              <Clock className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                              <span>{getEventTimeRange(event)}</span>
                            </div>
                            <div className="flex items-center text-xs md:text-sm text-gray-600">
                              <MapPin className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 md:ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(event)}
                            className="flex-1 md:flex-none bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300 transition-all duration-200 text-xs md:text-sm"
                          >
                            <Edit className="h-3 md:h-4 w-3 md:w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(event)}
                            className="flex-1 md:flex-none bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300 transition-all duration-200 text-xs md:text-sm"
                          >
                            <Trash2 className="h-3 md:h-4 w-3 md:w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <EventFormModal
          event={editingEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateEvent}
        />
      </div>
    </>
  )
}
