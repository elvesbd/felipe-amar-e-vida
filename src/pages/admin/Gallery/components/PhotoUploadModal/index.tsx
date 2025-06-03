"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { X, Upload, ImageIcon, Tag, FileText } from "lucide-react"
import { Button } from "../../../../../components/Button"
import { Label } from "../../../../../components/Label"
import { Textarea } from "../../../../../components/TextArea"


// Schema atualizado com campo alt obrigatório
const photoSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Selecione pelo menos uma foto"),
  category: z.string().min(1, "Categoria é obrigatória"),
  altText: z
    .string()
    .min(1, "Descrição para acessibilidade é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(200, "Descrição deve ter no máximo 200 caracteres"),
})

type PhotoFormData = z.infer<typeof photoSchema>

interface PhotoUploadModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (data: PhotoFormData) => void
}

export default function PhotoUploadModal({ isOpen, onClose, onSubmit }: PhotoUploadModalProps) {
  const [formData, setFormData] = useState<Partial<PhotoFormData>>({
    files: [],
    category: "",
    altText: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PhotoFormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  const categories = [
    { value: "Aulas", label: "Aulas" },
    { value: "Eventos", label: "Eventos" },
    { value: "Equipamentos", label: "Equipamentos" },
  ]

  const handleInputChange = (field: keyof PhotoFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleInputChange("files", files)

      const newPreviews: string[] = []
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string)
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeFile = (index: number) => {
    const newFiles = formData.files?.filter((_, i) => i !== index) || []
    const newPreviews = previews.filter((_, i) => i !== index)

    handleInputChange("files", newFiles)
    setPreviews(newPreviews)
  }

  const validateForm = (): boolean => {
    try {
      photoSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof PhotoFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof PhotoFormData] = err.message
          }
        })
        setErrors(fieldErrors)
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
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onSubmit(formData as PhotoFormData)
      handleClose()
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      files: [],
      category: "",
      altText: "",
    })
    setErrors({})
    setPreviews([])
    onClose()
  }

  // Sugestões de descrição baseadas na categoria
  const getAltSuggestions = (category: string) => {
    const suggestions = {
      Aulas: [
        "Aluno praticando surfe adaptado na Praia do Futuro",
        "Instrutor auxiliando pessoa com deficiência no surfe",
        "Aula de surfe adaptado em grupo na praia",
      ],
      Eventos: [
        "Evento comunitário do projeto Felipe A Maré Vida",
        "Competição de surfe adaptado na Praia do Futuro",
        "Workshop de conscientização ambiental",
      ],
      Equipamentos: [
        "Prancha de surfe adaptada para deficientes visuais",
        "Equipamentos de segurança para surfe adaptado",
        "Material esportivo adaptado para pessoas com deficiência",
      ],
    }
    return suggestions[category as keyof typeof suggestions] || []
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <p className="text-gray-600">Adicione novas fotos à galeria do projeto</p>
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

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Upload de Arquivos */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <ImageIcon className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Selecionar Fotos
            </Label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#63A6DC] transition-colors duration-200">
              {previews.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPreviews([])
                      setFormData((prev) => ({ ...prev, files: [] }))
                    }}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Remover Todas
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-600 mb-2">Clique para selecionar fotos ou arraste aqui</p>
                    <p className="text-sm text-gray-400">PNG, JPG ou JPEG até 5MB cada</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Categoria
            </Label>
            <select
              id="category"
              value={formData.category || ""}
              onChange={(e) => handleInputChange("category", e.target.value)}
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

          {/* Descrição para Acessibilidade (ALT Text) */}
          <div className="space-y-2">
            <Label htmlFor="altText" className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Descrição para Acessibilidade
              <span className="ml-1 text-red-500">*</span>
            </Label>
            <Textarea
              id="altText"
              value={formData.altText || ""}
              onChange={(e) => handleInputChange("altText", e.target.value)}
              placeholder="Descreva o que está acontecendo na foto para pessoas com deficiência visual..."
              rows={3}
              className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 resize-none ${errors.altText ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.altText && <p className="text-red-500 text-sm">{errors.altText}</p>}

            {/* Dicas de Acessibilidade */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Dicas para uma boa descrição:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Descreva a ação principal da foto</li>
                <li>• Mencione pessoas, objetos e ambiente</li>
                <li>• Seja específico mas conciso</li>
                <li>• Evite "foto de" ou "imagem de"</li>
              </ul>
            </div>

            {/* Sugestões baseadas na categoria */}
            {formData.category && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Sugestões para {formData.category}:</p>
                <div className="flex flex-wrap gap-2">
                  {getAltSuggestions(formData.category).map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleInputChange("altText", suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
              disabled={loading}
              className="px-6 py-2 bg-[#63A6DC] hover:bg-[#4a8bc4] text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Fazendo Upload...
                </div>
              ) : (
                `Fazer Upload (${formData.files?.length || 0} fotos)`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
