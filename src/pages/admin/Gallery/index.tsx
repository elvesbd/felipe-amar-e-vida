import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Trash2, ImageIcon, Eye } from "lucide-react"

import { Badge } from "../../../components/Badge"
import { Button } from "../../../components/Button"
import PhotoViewModal from "./components/PhotoViewModal"
import PhotoUploadModal from "./components/PhotoUploadModal"
import { useFullPageLoader } from "../../../hooks/useFullPageLoader"
import { deletePhoto, getGalleryPhotos, registerPhoto } from "../../../lib/api"
import type { GalleryPhoto, UploadedPhotoFormData } from "../../../lib/interfaces/photos.interfaces"
import ImageWithPlaceholder from "../../../components/ImageWithPlaceholder"


export default function AdminGallery() {
  const navigate = useNavigate()
  const { showLoader, hideLoader, Loader } = useFullPageLoader()

  const [isLoading, setIsLoading] = useState(true)
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewingPhoto, setViewingPhoto] = useState<GalleryPhoto | null>(null)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        showLoader()
        setIsLoading(true)
        const response = await getGalleryPhotos()
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Delay para ver o loader

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

      } finally {
        hideLoader()
        setIsLoading(false)
      }
    }

    fetchPhotos()
  }, [hideLoader, showLoader])

  const categories = [
    { key: "all", label: "Todas", color: "bg-gray-100 text-gray-700" },
    { key: "Aulas", label: "Aulas", color: "bg-blue-100 text-blue-700" },
    { key: "Eventos", label: "Eventos", color: "bg-green-100 text-green-700" },
    { key: "Equipamentos", label: "Equipamentos", color: "bg-purple-100 text-purple-700" },
  ]

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    return matchesCategory
  })

  const handleDelete = async (photo: GalleryPhoto) => {
    try {
      await deletePhoto(photo.id)
      toast.success("Foto apagada com sucesso!")

      const updatedPhotos = await getGalleryPhotos()
      setPhotos(updatedPhotos)
    } catch {
      toast.error("Erro ao apagar a foto. Tente novamente.")
    }
  }

  const handleUploadPhoto = async (data: UploadedPhotoFormData) => {
    try {
      const payload = {
        category: data.category,
        photos: data.photos.map(({ altText, publicUrl }) => ({
          altText,
          publicUrl,
        })),
      }
      await registerPhoto(payload)
      toast.success("Foto registrada com sucesso!")

      const updatedPhotos = await getGalleryPhotos()
      setPhotos(updatedPhotos)
    } catch {
      toast.error("Erro ao registrar a foto. Tente novamente.")
    }
  }

  const handleViewPhoto = (photo: GalleryPhoto) => {
    setViewingPhoto(photo)
  }

  return (
    <>
      {Loader}

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
        {!isLoading && (
          <header className="bg-white shadow-sm border-0">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
              {/* Layout Desktop */}
              <div className="hidden md:flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin")}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>

                <img src="/logo-footer.png" alt="Logomarca do projeto" className="h-12 w-12" />

                <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 border-0"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload de Fotos
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

                <img src="/logo-footer.png" alt="Logomarca do projeto" className="h-10 w-10" />

                <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  size="sm"
                  className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 border-0 px-3"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
        )}

        <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "secondary"}
                className={`cursor-pointer px-3 md:px-4 py-2 text-xs md:text-sm transition-all duration-200 ${selectedCategory === category.key ? "bg-[#63A6DC] hover:bg-[#4a8bc4] text-white" : "hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          {!isLoading && filteredPhotos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border-0 mt-6">
              <ImageIcon className="h-12 md:h-16 w-12 md:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nenhuma foto na galeria
              </h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                Comece fazendo upload de suas primeiras fotos
              </p>
              <Button onClick={() => setIsUploadModalOpen(true)} className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white">
                <Upload className="h-4 w-4 mr-2" />
                Fazer Primeiro Upload
              </Button>
            </div>
          ) : (
            <>
              {/* Grid de Fotos */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-6">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0 transform hover:-translate-y-1"
                  >
                    {/* Imagem */}
                    <div className="relative aspect-square overflow-hidden">
                      <ImageWithPlaceholder
                        src={photo.publicUrl || "/placeholder.svg"}
                        alt={photo.altTextPt}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay com ações */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleViewPhoto(photo)}
                            className="bg-white/90 hover:bg-white text-gray-700 shadow-md"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(photo)}
                            className="bg-red-500/90 hover:bg-red-600 text-white shadow-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Badge da Categoria */}
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`text-xs font-medium ${categories.find((c) => c.key === photo.category)?.color ?? "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {photo.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Modal de Upload */}
        <PhotoUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSubmit={handleUploadPhoto}
        />

        {/* Modal de Visualização */}
        <PhotoViewModal photo={viewingPhoto} onClose={() => setViewingPhoto(null)} onDelete={handleDelete} />
      </div>
    </>
  )
}
