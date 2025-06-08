"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Header from "../../components/Header"
import { Badge } from "../../components/Badge"
import Footer from "../Home/components/Footer"
import { Button } from "../../components/Button"
import PhotoModal from "../../components/PhotoModal"
import type { Photo } from "./interfaces/photo.interface"

export default function GalleryPage() {
  const photosPerPage = 12
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [photos] = useState<Photo[]>([
    {
      id: "1",
      publicUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Aula de surfe adaptado na Praia do Futuro",
      category: "Aulas",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      originalName: "foto"
    },
  ])

  const categories = [
    { key: "all", label: t("gallery.categories.all") },
    { key: "Aulas", label: t("gallery.categories.aulas") },
    { key: "Eventos", label: t("gallery.categories.eventos") },
    { key: "Equipamentos", label: t("gallery.categories.equipamentos") },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)
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
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header da Galeria */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("gallery.backToHome")}
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {currentPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => openModal(photo)}
                  >
                    <div className="aspect-square">
                      <img
                        src={photo.publicUrl || "/placeholder.svg"}
                        alt={photo.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-auto bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/80 text-xs">  {t(`gallery.categories.${photo.category.toLowerCase()}`)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

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
              <p className="text-gray-500 text-lg">{t("gallery.noPhotos")}</p>
            </div>
          )}
        </div>
      </div>

      <PhotoModal
        onNext={nextPhoto}
        onPrev={prevPhoto}
        onClose={closeModal}
        photo={selectedPhoto}
        photos={filteredPhotos}
      />

      <Footer />
    </div>
  )
}
