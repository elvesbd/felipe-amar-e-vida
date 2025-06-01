"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { Button } from "../../components/Button"
import EventCard from "./components/Card"
import EventModal from "./components/Modal"


interface EventsPageProps {
  language: "pt" | "en"
  setLanguage: (lang: "pt" | "en") => void
}

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

export default function EventsPage({ language, setLanguage }: EventsPageProps) {
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Dados de exemplo - substituir pelos eventos reais
  const allEvents: Event[] = [
    {
      id: 1,
      title: {
        pt: "Aula Especial de Surfe Adaptado",
        en: "Special Adaptive Surf Class",
      },
      description: {
        pt: "Aula especial com foco em técnicas avançadas de surfe adaptado para pessoas com deficiência visual.",
        en: "Special class focused on advanced adaptive surfing techniques for people with visual impairments.",
      },
      fullDescription: {
        pt: "Esta aula especial será dedicada ao desenvolvimento de técnicas avançadas de surfe adaptado, com foco especial em pessoas com deficiência visual. Contaremos com instrutores especializados e equipamentos adaptados para garantir uma experiência segura e enriquecedora para todos os participantes.",
        en: "This special class will be dedicated to developing advanced adaptive surfing techniques, with a special focus on people with visual impairments. We will have specialized instructors and adapted equipment to ensure a safe and enriching experience for all participants.",
      },
      date: {
        pt: "15 de Janeiro, 2024",
        en: "January 15, 2024",
      },
      time: "14h45 - 17h00",
      location: "PF Surf School - Praia do Futuro",
      category: language === "pt" ? "Aulas Especiais" : "Special Classes",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
    {
      id: 2,
      title: {
        pt: "Workshop de Conscientização Ambiental",
        en: "Environmental Awareness Workshop",
      },
      description: {
        pt: "Workshop sobre preservação marinha e sustentabilidade nas práticas esportivas.",
        en: "Workshop on marine preservation and sustainability in sports practices.",
      },
      fullDescription: {
        pt: "Um workshop completo sobre a importância da preservação do meio ambiente marinho e como podemos contribuir através de práticas esportivas sustentáveis. Abordaremos temas como poluição oceânica, conservação da vida marinha e ações práticas que cada um pode tomar.",
        en: "A complete workshop on the importance of marine environment preservation and how we can contribute through sustainable sports practices. We will address topics such as ocean pollution, marine life conservation, and practical actions everyone can take.",
      },
      date: {
        pt: "22 de Janeiro, 2024",
        en: "January 22, 2024",
      },
      time: "09h00 - 12h00",
      location: "Centro Comunitário - Vicente Pinzon",
      category: language === "pt" ? "Ações Ambientais" : "Environmental Actions",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
    {
      id: 3,
      title: {
        pt: "Competição de Surfe Adaptado",
        en: "Adaptive Surf Competition",
      },
      description: {
        pt: "Primeira competição oficial de surfe adaptado do projeto Felipe A Maré Vida.",
        en: "First official adaptive surf competition of the Felipe A Maré Vida project.",
      },
      fullDescription: {
        pt: "Nossa primeira competição oficial de surfe adaptado! Um evento histórico que celebra os avanços e conquistas de nossos alunos. A competição será dividida em categorias de acordo com o tipo de deficiência e nível de experiência, garantindo que todos possam participar de forma justa e divertida.",
        en: "Our first official adaptive surf competition! A historic event that celebrates the progress and achievements of our students. The competition will be divided into categories according to disability type and experience level, ensuring everyone can participate fairly and enjoyably.",
      },
      date: {
        pt: "10 de Dezembro, 2023",
        en: "December 10, 2023",
      },
      time: "08h00 - 16h00",
      location: "Praia do Futuro - Fortaleza",
      category: language === "pt" ? "Competições" : "Competitions",
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
    {
      id: 4,
      title: {
        pt: "Evento Comunitário de Integração",
        en: "Community Integration Event",
      },
      description: {
        pt: "Encontro para integração entre alunos, familiares e voluntários do projeto.",
        en: "Meeting for integration between students, families and project volunteers.",
      },
      fullDescription: {
        pt: "Um dia especial dedicado à integração de toda nossa comunidade. Teremos atividades recreativas, apresentações dos alunos, depoimentos inspiradores e um delicioso almoço comunitário. É uma oportunidade única para fortalecer os laços entre todos os envolvidos no projeto.",
        en: "A special day dedicated to integrating our entire community. We will have recreational activities, student presentations, inspiring testimonials, and a delicious community lunch. It's a unique opportunity to strengthen bonds between everyone involved in the project.",
      },
      date: {
        pt: "05 de Fevereiro, 2024",
        en: "February 5, 2024",
      },
      time: "10h00 - 16h00",
      location: "PF Surf School - Praia do Futuro",
      category: language === "pt" ? "Eventos Comunitários" : "Community Events",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
    {
      id: 5,
      title: {
        pt: "Workshop de Primeiros Socorros",
        en: "First Aid Workshop",
      },
      description: {
        pt: "Capacitação em primeiros socorros para voluntários e instrutores.",
        en: "First aid training for volunteers and instructors.",
      },
      fullDescription: {
        pt: "Workshop essencial para capacitar nossos voluntários e instrutores em técnicas de primeiros socorros específicas para atividades aquáticas e esportivas adaptadas. Será ministrado por profissionais da área de saúde com experiência em emergências aquáticas.",
        en: "Essential workshop to train our volunteers and instructors in first aid techniques specific to aquatic activities and adapted sports. It will be taught by health professionals with experience in aquatic emergencies.",
      },
      date: {
        pt: "28 de Janeiro, 2024",
        en: "January 28, 2024",
      },
      time: "13h00 - 17h00",
      location: "Sede do Projeto - Vicente Pinzon",
      category: "Workshops",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
    {
      id: 6,
      title: {
        pt: "Limpeza da Praia - Ação Ambiental",
        en: "Beach Cleanup - Environmental Action",
      },
      description: {
        pt: "Mutirão de limpeza da Praia do Futuro com foco na educação ambiental.",
        en: "Beach cleanup effort at Praia do Futuro focused on environmental education.",
      },
      fullDescription: {
        pt: "Ação ambiental que combina a limpeza da nossa querida Praia do Futuro com atividades educativas sobre preservação ambiental. Todos os participantes receberão materiais informativos e participarão de dinâmicas sobre sustentabilidade e conservação marinha.",
        en: "Environmental action that combines cleaning our beloved Praia do Futuro with educational activities about environmental preservation. All participants will receive informational materials and participate in dynamics about sustainability and marine conservation.",
      },
      date: {
        pt: "18 de Dezembro, 2023",
        en: "December 18, 2023",
      },
      time: "07h00 - 11h00",
      location: "Praia do Futuro - Fortaleza",
      category: language === "pt" ? "Ações Ambientais" : "Environmental Actions",
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    },
  ]

  const content = {
    pt: {
      backToHome: "Voltar ao Início",
      noEvents: "Nenhum evento encontrado.",
    },
    en: {
      backToHome: "Back to Home",
      noEvents: "No events found.",
    },
  }

  const t = content[language]

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
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4 py-8">
        {/* Header da Página */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToHome}
          </Button>
        </div>

        {/* Grid de Eventos */}
        {currentEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={openModal} language={language} />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {language === "pt" ? "Anterior" : "Previous"}
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
                  {language === "pt" ? "Próxima" : "Next"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noEvents}</p>
          </div>
        )}
      </div>

      {/* Modal de Evento */}
      <EventModal event={selectedEvent} onClose={closeModal} language={language} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo-footer.png" alt="Felipe A Maré Vida" className="w-12 h-12" />
          </div>
          <p className="text-gray-400">
            {language === "pt"
              ? "© 2024 Felipe A Maré Vida. Transformando vidas através do surfe."
              : "© 2024 Felipe A Maré Vida. Transforming lives through surfing."}
          </p>
        </div>
      </footer>
    </div>
  )
}
