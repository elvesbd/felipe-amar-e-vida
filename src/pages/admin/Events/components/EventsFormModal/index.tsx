import { z } from "zod"
import { useEffect, useState } from "react"
import { X, Upload, Calendar, Clock, MapPin, FileText, ImageIcon } from "lucide-react"

import { Label } from "../../../../../components/Label"
import { Input } from "../../../../../components/Input"
import { Button } from "../../../../../components/Button"
import { Textarea } from "../../../../../components/TextArea"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
}

const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(5, "Título deve ter pelo menos 5 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(300, "Descrição deve ter no máximo 300 caracteres"),
  date: z.string().min(1, "Data é obrigatória"),
  time: z
    .string()
    .min(1, "Horário é obrigatório")
    .regex(/^([0-1]?[0-9]|2[0-3])h[0-5][0-9]/, "Formato de horário inválido (ex: 14h30)"),
  location: z
    .string()
    .min(1, "Local é obrigatório")
    .min(5, "Local deve ter pelo menos 5 caracteres")
    .max(150, "Local deve ter no máximo 150 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  image: z.instanceof(File).optional().refine((file) => file instanceof File, {
    message: "Imagem é obrigatória"
  }),
})

type EventFormData = z.infer<typeof eventSchema>

interface EventFormModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (data: EventFormData) => void
  readonly event?: Event | null
}

export default function EventFormModal({ isOpen, onClose, onSubmit, event }: EventFormModalProps) {
  const isEditing = !!event
  const [formData, setFormData] = useState<Partial<EventFormData>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({})

  const handleInputChange = (field: keyof EventFormData, value: string | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("image", file)

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    try {
      eventSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof EventFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof EventFormData] = err.message
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSubmit(formData as EventFormData)
      handleClose()
    } catch (error) {
      console.error("Erro ao criar evento:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    })
    setErrors({})
    setImagePreview(null)
    onClose()
  }

  // Pré-preencher formulário quando em modo de edição
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
      })
      setImagePreview(event.image)
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      })
      setImagePreview(null)
    }
  }, [event])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <p className="text-gray-600">
              {isEditing ? "Atualize as informações do evento" : "Preencha as informações do evento"}
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

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Título do Evento
            </Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ex: Workshop de Surfe Adaptado"
              className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 ${errors.title ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Descrição Resumida
            </Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descrição breve que aparecerá nos cards do evento..."
              rows={3}
              className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 resize-none ${errors.description ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Data e Horário */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-[#63A6DC]" />
                Data
              </Label>
              <Input
                id="date"
                value={formData.date || ""}
                onChange={(e) => handleInputChange("date", e.target.value)}
                placeholder="Ex: 15 de Janeiro, 2024"
                className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 ${errors.date ? "ring-2 ring-red-500" : ""
                  }`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-[#63A6DC]" />
                Horário
              </Label>
              <Input
                id="time"
                value={formData.time || ""}
                onChange={(e) => handleInputChange("time", e.target.value)}
                placeholder="Ex: 14h45 - 17h00"
                className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 ${errors.time ? "ring-2 ring-red-500" : ""
                  }`}
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>
          </div>

          {/* Local */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Local
            </Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Ex: PF Surf School - Praia do Futuro"
              className={`bg-gray-50 border-0 focus:ring-2 focus:ring-[#63A6DC] transition-all duration-200 ${errors.location ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <ImageIcon className="h-4 w-4 mr-2 text-[#63A6DC]" />
              Imagem do Evento
            </Label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#63A6DC] transition-colors duration-200">
              {imagePreview ? (
                <div className="space-y-4">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, image: undefined }))
                    }}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Remover Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-600 mb-2">Clique para selecionar uma imagem</p>
                    <p className="text-sm text-gray-400">PNG, JPG ou JPEG até 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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
                  {isEditing ? "Salvando..." : "Criando..."}
                </div>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Criar Evento"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
