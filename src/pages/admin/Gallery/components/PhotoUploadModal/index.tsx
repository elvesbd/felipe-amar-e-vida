import { z } from "zod"
import { useState } from "react"
import { X, Upload, ImageIcon, Tag, FileText, Trash2 } from "lucide-react"

import { categories } from "./constants/categories"
import { photoSchema } from "./validation/photo.schema"
import { Label } from "../../../../../components/Label"
import { Button } from "../../../../../components/Button"
import { Textarea } from "../../../../../components/TextArea"
import { uploadToS3 } from "../../../../../services/s3/upload"
import type { UploadedPhotoFormData } from "../../../../Gallery/interfaces/photo.interface"
import { getPreSignedUrl } from "../../../../../lib/api"

interface PhotoItem {
  file: File
  preview: string
  altText: string
  id: string
}

interface PhotoUploadModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (data: UploadedPhotoFormData) => void
}

export default function PhotoUploadModal({ isOpen, onClose, onSubmit }: PhotoUploadModalProps) {
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<PhotoItem[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newPhotos: PhotoItem[] = files.map((file) => {
        const preview = URL.createObjectURL(file)
        const tempId = `temp_${Date.now()}_${file.name.replace(/\s+/g, "_")}`

        return {
          file,
          preview,
          altText: "",
          id: tempId,
        }
      })

      setPhotos((prev) => [...prev, ...newPhotos])
      setErrors({})
    }
  }

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photoToRemove = prev.find((p) => p.id === id)
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.preview)
      }
      return prev.filter((p) => p.id !== id)
    })
  }

  const updatePhotoAltText = (id: string, altText: string) => {
    setPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, altText } : photo)))

    if (errors.photos) {
      const photoIndex = photos.findIndex((p) => p.id === id)
      if (photoIndex !== -1 && errors.photos[photoIndex]) {
        setErrors((prev: { photos: any[] }) => ({
          ...prev,
          photos: prev.photos.map((err: any, index: number) => (index === photoIndex ? undefined : err)),
        }))
      }
    }
  }

  const validateForm = (): boolean => {
    try {
      const formData = {
        photos: photos.map((p) => ({ file: p.file, altText: p.altText })),
        category,
      }
      photoSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (path.startsWith("photos.")) {
            fieldErrors.photos ??= [];
            const index = Number.parseInt(err.path[1] as string);
            fieldErrors.photos[index] ??= {};
            fieldErrors.photos[index][err.path[2] as string] = err.message;
          } else {
            fieldErrors[path] = err.message;
          }
        });
        setErrors(fieldErrors);
      }

      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const urlsData = await Promise.all(photos.map(async (photo) => {
        const { signedURL, publicURL } = await getPreSignedUrl(photo.file)

        return {
          photo,
          signedURL,
          publicURL
        }
      }))

      await Promise.allSettled(urlsData.map(({ signedURL, photo }) => (
        uploadToS3(signedURL, photo.file)
      )))

      const formData: UploadedPhotoFormData = {
        photos: urlsData.map(({ photo, publicURL }) => ({
          file: photo.file,
          altText: photo.altText,
          publicUrl: publicURL
        })),
        category,
      }

      onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    // Limpar URLs de preview para evitar memory leaks
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview))
    setPhotos([])
    setCategory("")
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload de Fotos</h2>
            <p className="text-gray-600">
              {photos.length > 0
                ? `${photos.length} foto${photos.length > 1 ? "s" : ""} selecionada${photos.length > 1 ? "s" : ""}`
                : "Adicione fotos à galeria do projeto"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Área de Upload */}
          {photos.length === 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center">
                <ImageIcon className="h-4 w-4 mr-2 text-[#63A6DC]" />
                Selecionar Fotos
              </Label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#63A6DC] transition-colors duration-200">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div>
                  <p className="text-gray-600 mb-2">Clique para selecionar fotos ou arraste aqui</p>
                  <p className="text-sm text-gray-400">PNG, JPG ou JPEG até 5MB cada</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Você poderá adicionar descrição individual para cada foto
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Lista de Fotos com Descrições Individuais */}
          {photos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2 text-[#63A6DC]" />
                  Fotos Selecionadas ({photos.length})
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-[#63A6DC] border-[#63A6DC] hover:bg-[#63A6DC] hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Adicionar Mais
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {photos.map((photo, index) => (
                  <div key={photo.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex gap-4">
                      {/* Preview da Imagem */}
                      <div className="relative flex-shrink-0">
                        <img
                          loading="lazy"
                          src={photo.preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Informações e Descrição */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{photo.file.name}</p>
                          <p className="text-xs text-gray-500">{(photo.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        {/* Campo de Descrição Individual */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-700 flex items-center">
                            <FileText className="h-3 w-3 mr-1 text-[#63A6DC]" />
                            Descrição para Acessibilidade
                            <span className="ml-1 text-red-500">*</span>
                          </Label>
                          <Textarea
                            value={photo.altText}
                            onChange={(e) => updatePhotoAltText(photo.id, e.target.value)}
                            placeholder="Descreva esta foto específica..."
                            rows={2}
                            className={`text-sm bg-white border-gray-300 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 resize-none ${errors.photos?.[index]?.altText ? "ring-2 ring-red-500" : ""
                              }`}
                          />
                          {errors.photos?.[index]?.altText && (
                            <p className="text-red-500 text-xs">{errors.photos[index].altText}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Categoria
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 ${errors.category ? "ring-2 ring-red-500" : ""
                }`}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Dicas de Acessibilidade */}
          {photos.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Dicas para descrições acessíveis:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Cada foto deve ter sua própria descrição específica</li>
                <li>• Descreva a ação principal e elementos únicos de cada imagem</li>
                <li>• Mencione pessoas, objetos e ambiente específicos</li>
                <li>• Seja específico mas conciso (10-200 caracteres)</li>
              </ul>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || photos.length === 0}
              className="px-6 py-2 bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Fazendo Upload...
                </div>
              ) : (
                `Fazer Upload (${photos.length} foto${photos.length !== 1 ? "s" : ""})`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
