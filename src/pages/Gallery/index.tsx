"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header"
import { Badge } from "../../components/Badge"
import { Button } from "../../components/Button"
import PhotoModal from "../../components/PhotoModal"
import type { Photo } from "./interfaces/photo.interface"

interface GalleryPageProps {
  readonly language: "pt" | "en"
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function GalleryPage({ language, setLanguage }: GalleryPageProps) {
  const photosPerPage = 12
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Dados de exemplo - substituir pelas fotos reais
  const allPhotos: Photo[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Aula de surfe adaptado na Praia do Futuro",
      category: "Aulas",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Aluno praticando surfe com instrutor",
      category: "Aulas",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Evento de confraternização do projeto",
      category: "Eventos",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Equipamentos de surfe adaptado",
      category: "Equipamentos",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Grupo de alunos na praia",
      category: "Aulas",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Competição de surfe adaptado",
      category: "Eventos",
    },
    // Adicionar mais fotos conforme necessário
  ]

  const content = {
    pt: {
      categories: {
        all: "Todas",
        aulas: "Aulas",
        eventos: "Eventos",
        equipamentos: "Equipamentos",
      },
      backToHome: "Voltar ao Início",
      noPhotos: "Nenhuma foto encontrada nesta categoria.",
      loading: "Carregando fotos...",
    },
    en: {
      categories: {
        all: "All",
        aulas: "Classes",
        eventos: "Events",
        equipamentos: "Equipment",
      },
      backToHome: "Back to Home",
      noPhotos: "No photos found in this category.",
      loading: "Loading photos...",
    },
  }

  const t = content[language]

  const categories = [
    { key: "all", label: t.categories.all },
    { key: "Aulas", label: t.categories.aulas },
    { key: "Eventos", label: t.categories.eventos },
    { key: "Equipamentos", label: t.categories.equipamentos },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? allPhotos : allPhotos.filter((photo) => photo.category === selectedCategory)

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)
  const startIndex = (currentPage - 1) * photosPerPage
  const currentPhotos = filteredPhotos.slice(startIndex, startIndex + photosPerPage)

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
      const nextIndex = (currentIndex + 1) % filteredPhotos.length
      setSelectedPhoto(filteredPhotos[nextIndex])
    }
  }

  const prevPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
      const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      setSelectedPhoto(filteredPhotos[prevIndex])
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4 py-8">
        {/* Header da Galeria */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToHome}
          </Button>
        </div>

        {/* Filtros de Categoria */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 text-sm ${selectedCategory === category.key ? "bg-[#63A6DC] hover:bg-[#4a8bc4]" : "hover:bg-gray-200"
                  }`}
                onClick={() => {
                  setSelectedCategory(category.key)
                  setCurrentPage(1)
                }}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Grid de Fotos */}
        {currentPhotos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {currentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => openModal(photo)}
                >
                  <div className="aspect-square">
                    <img
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium truncate">{photo.alt}</p>
                    <p className="text-white/80 text-xs">{photo.category}</p>
                  </div>
                </div>
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
                  Anterior
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
                  Próxima
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noPhotos}</p>
          </div>
        )}
      </div>

      {/* Modal de Foto */}
      <PhotoModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />

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
