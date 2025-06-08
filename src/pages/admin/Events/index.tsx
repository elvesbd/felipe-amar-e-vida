import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Edit, Trash2, Calendar, Clock, MapPin, Search } from "lucide-react"

import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import EventFormModal from "./components/EventsFormModal"

interface TranslatedFields {
  title: string
  description: string
  fullDescription?: string
  location: string
}

export interface Event {
  id: number | string
  image: string
  isoDate: string
  startTime: string
  endTime: string
  timezone: string
  pt: TranslatedFields
  en: TranslatedFields
}

export default function AdminEvents() {
  const currentLang = 'pt'
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  // Dados de exemplo - substituir pela API real
  const [events] = useState<Event[]>([
    {
      id: "1",
      isoDate: "2025-06-23T03:00:00.000Z", // formato ISO sugerido, você pode adaptar
      startTime: "14:45",
      endTime: "17:00",
      timezone: "America/Fortaleza", // ou outro fuso horário aplicável
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      pt: {
        title: "Aula Especial de Surfe Adaptado",
        description: "Aula especial com foco em técnicas avançadas de surfe adaptado para pessoas com deficiência visual.",
        fullDescription: "Esta aula especial será dedicada ao desenvolvimento de técnicas avançadas de surfe adaptado, com foco especial em pessoas com deficiência visual.",
        location: "PF Surf School - Praia do Futuro"
      },
      en: {
        title: "Special Adaptive Surfing Class",
        description: "Special class focusing on advanced adaptive surfing techniques for people with visual impairments.",
        fullDescription: "This special class will be dedicated to the development of advanced adaptive surfing techniques, with a special focus on people with visual impairments.",
        location: "PF Surf School - Praia do Futuro"
      }
    }
  ])

  const filteredEvents = events.filter((event) => {
    const content = event[currentLang]
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })


  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleDelete = (event: Event) => {
    // Implementar exclusão com confirmação
    if (window.confirm(`Tem certeza que deseja excluir o evento "${event[currentLang].title}"?`)) {
      console.log("Excluir evento:", event.id)
    }
  }

  const handleCreateEvent = (eventData: any) => {
    if (editingEvent) {
      console.log("Atualizar evento:", editingEvent.id, eventData)
      // Aqui você faria a chamada para a API de atualização
      // PUT /api/events/${editingEvent.id}
    } else {
      console.log("Criar novo evento:", eventData)
      // Aqui você faria a chamada para a API de criação
      // POST /api/events
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
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
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event[currentLang].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{event[currentLang].title}</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">{event[currentLang].description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                          <div className="flex items-center text-xs md:text-sm text-gray-600">
                            <Calendar className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                            {format(new Date(event.isoDate), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                          </div>
                          <div className="flex items-center text-xs md:text-sm text-gray-600">
                            <Clock className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                            <span>
                              {event.startTime.replace(':', 'h')} - {event.endTime.replace(':', 'h')}
                            </span>
                          </div>
                          <div className="flex items-center text-xs md:text-sm text-gray-600">
                            <MapPin className="h-3 md:h-4 w-3 md:w-4 mr-2 text-[#63A6DC] flex-shrink-0" />
                            <span className="truncate">{event[currentLang].location}</span>
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
  )
}
