"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Trash2 } from "lucide-react"
import { Button } from "../../../components/Button"
import { Card, CardContent } from "../../../components/Card"

interface GalleryProps {
  readonly language: "pt" | "en"
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function AdminGallery({ language }: GalleryProps) {
  const navigate = useNavigate()
  const [photos] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Aula de surfe adaptado",
      category: "Aulas",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Evento comunitário",
      category: "Eventos",
    },
  ])

  const content = {
    pt: {
      title: "Gerenciar Galeria",
      backToDashboard: "Voltar ao Dashboard",
      uploadPhotos: "Upload de Fotos",
      noPhotos: "Nenhuma foto na galeria",
      delete: "Excluir",
    },
    en: {
      title: "Manage Gallery",
      backToDashboard: "Back to Dashboard",
      uploadPhotos: "Upload Photos",
      noPhotos: "No photos in gallery",
      delete: "Delete",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToDashboard}
              </Button>
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <Button className="bg-[#63A6DC] hover:bg-[#4a8bc4]">
              <Upload className="h-4 w-4 mr-2" />
              {t.uploadPhotos}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noPhotos}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-square">
                  <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{photo.category}</span>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
