import { toast } from "react-toastify"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect, useState, useMemo } from "react"

import Header from "../../components/Header"
import { getAltText } from "../../lib/utils"
import { Badge } from "../../components/Badge"
import Footer from "../Home/components/Footer"
import { Button } from "../../components/Button"
import { getGalleryPhotos } from "../../lib/api"
import PhotoModal from "../../components/PhotoModal"
import type { GalleryPhoto } from "./interfaces/photo.interface"
import Pagination from "./components/Pagination"


export default function GalleryPage() {
  const photosPerPage = 12
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await getGalleryPhotos()
        setPhotos(response)

        response.forEach((photo) => {
          if (photo.publicUrl) {
            const img = new Image()
            img.src = photo.publicUrl
          }
        })
      } catch (error) {
        console.error("Erro ao carregar fotos:", error)
        toast.error("Erro ao carregar fotos da galeria. Tente novamente mais tarde.")
      }
    }
    fetchPhotos()
  }, [])

  const categories = [
    { key: "all", label: t("gallery.categories.all") },
    { key: "Aulas", label: t("gallery.categories.aulas") },
    { key: "Eventos", label: t("gallery.categories.eventos") },
    { key: "Equipamentos", label: t("gallery.categories.equipamentos") },
  ]


  const filteredPhotos = useMemo(() => {
    return selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory)
  }, [photos, selectedCategory])

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)

  const currentPhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * photosPerPage
    return filteredPhotos.slice(startIndex, startIndex + photosPerPage)
  }, [filteredPhotos, currentPage])


  const openModal = (photo: GalleryPhoto) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("gallery.backToHome")}
            </Button>
          </div>

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
                        loading="lazy"
                        src={photo.publicUrl || "/placeholder.svg"}
                        alt={getAltText(photo, i18n.language)}
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
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
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
