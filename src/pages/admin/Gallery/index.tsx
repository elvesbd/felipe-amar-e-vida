import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Trash2, ImageIcon, Eye } from "lucide-react"

import { Badge } from "../../../components/Badge"
import { Button } from "../../../components/Button"
import PhotoViewModal from "./components/PhotoViewModal"
import PhotoUploadModal from "./components/PhotoUploadModal"
import type { Photo } from "../../Gallery/interfaces/photo.interface"

export default function AdminGallery() {
  const navigate = useNavigate()

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null)
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
    {
      id: "2",
      publicUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Aluno praticando surfe com instrutor",
      category: "Aulas",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      originalName: "foto"
    },
    {
      id: "3",
      publicUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Evento de confraternização do projeto",
      category: "Eventos",
      uploadDate: "2024-01-13",
      size: "3.1 MB",
      originalName: "foto"
    },
    {
      id: "4",
      publicUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Equipamentos de surfe adaptado",
      category: "Equipamentos",
      uploadDate: "2024-01-12",
      size: "1.5 MB",
      originalName: "foto"
    },
    {
      id: "5",
      publicUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Grupo de alunos na praia",
      category: "Aulas",
      uploadDate: "2024-01-11",
      size: "2.7 MB",
      originalName: "foto"
    },
    {
      id: "6",
      publicUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Competição de surfe adaptado",
      category: "Eventos",
      uploadDate: "2024-01-10",
      size: "2.9 MB",
      originalName: "foto"
    },
    {
      id: "7",
      publicUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Pranchas adaptadas para deficientes visuais",
      category: "Equipamentos",
      uploadDate: "2024-01-09",
      size: "1.9 MB",
      originalName: "foto"
    },
    {
      id: "8",
      publicUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      altText: "Workshop de conscientização ambiental",
      category: "Eventos",
      uploadDate: "2024-01-08",
      size: "2.1 MB",
      originalName: "foto"
    },
  ])

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

  const handleDelete = (photo: Photo) => {
    if (window.confirm(`Tem certeza que deseja excluir a foto?`)) {
      console.log("Excluir foto:", photo.id)
      // Aqui você faria a chamada para a API
      // DELETE /api/photos/${photo.id}
    }
  }

  const handleUploadPhoto = (photoData: any) => {
    console.log("Upload de nova foto:", photoData)
    // Aqui você faria a chamada para a API
    // POST /api/photos
  }

  const handleViewPhoto = (photo: Photo) => {
    setViewingPhoto(photo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
      {/* Header */}
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

      {/* Main Content */}
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

        {/* Grid de Fotos */}
        {filteredPhotos.length === 0 ? (
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
                    <img
                      src={photo.publicUrl || "/placeholder.svg"}
                      alt={photo.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                        className={`text-xs font-medium ${categories.find((c) => c.key === photo.category)?.color || "bg-gray-100 text-gray-700"
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
  )
}
