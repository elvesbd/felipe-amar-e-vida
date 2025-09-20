import type React from "react"
import { ptBR } from "date-fns/locale"
import { isValid, parse } from "date-fns"
import { useState, useEffect } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import { X, Upload, Calendar, Clock, ImageIcon, MapPin } from "lucide-react"
import "react-datepicker/dist/react-datepicker.css"

import { uploadToS3 } from "../../../../../services/s3/upload"
import { validateEventForm } from "./validation/event-form.validation"
import { getPreSignedUrl, removeOldEventImage } from "../../../../../lib/api"
import type { Event, IEvent } from "../../../../../lib/interfaces/events.interfaces"
import ImageWithPlaceholder from "../../../../../components/ImageWithPlaceholder"

registerLocale("pt-BR", ptBR)

interface EventFormModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (data: any) => void
  readonly event?: Event | null
}

interface EventFormData {
  readonly title: string
  readonly description: string
  readonly fullDescription: string
  readonly location: string
  readonly startTime: string
  readonly endTime: string
  readonly image?: File
}

export default function EventFormModal({ isOpen, onClose, onSubmit, event }: EventFormModalProps) {
  const isEditing = !!event
  const TIMEZONE = "America/Fortaleza"

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    fullDescription: "",
    location: "",
    startTime: "",
    endTime: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.titlePt,
        description: event.descriptionPt,
        fullDescription: event.fullDescriptionPt ?? "",
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
      })
      setImagePreview(event.publicUrl)
      const parsedDate = parse(event.isoDateBR, "dd/MM/yyyy", new Date())
      const eventDate = isValid(parsedDate) ? parsedDate : null

      setSelectedDate(eventDate)
    } else {
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        location: "",
        startTime: "",
        endTime: "",
      })
      setImagePreview(null)
      setSelectedDate(null)
    }
  }, [event])

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (date && errors.date) {
      setErrors((prev) => ({ ...prev, date: "" }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors.startTime || errors.endTime) {
      setErrors((prev) => ({ ...prev, startTime: "", endTime: "" }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Por favor, selecione apenas arquivos de imagem." }))
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "A imagem deve ter no máximo 5MB." }))
        return
      }

      setFormData((prev) => ({ ...prev, image: file }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }))
      }
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: undefined }))
    setImagePreview(null)
  }

  const validateTimeFields = () => {
    const errors: Record<string, string> = {}

    if (!formData.startTime) {
      errors.startTime = "Horário de início é obrigatório"
    }

    if (!formData.endTime) {
      errors.endTime = "Horário de fim é obrigatório"
    }

    if (formData.startTime && formData.endTime) {
      const [startHour, startMin] = formData.startTime.split(":").map(Number)
      const [endHour, endMin] = formData.endTime.split(":").map(Number)

      const startMinutes = startHour * 60 + startMin
      const endMinutes = endHour * 60 + endMin

      if (endMinutes <= startMinutes) {
        errors.endTime = "Horário de fim deve ser posterior ao início"
      }
    }

    return errors
  }

  const buildValidationData = () => ({
    ...formData,
    date: selectedDate ? "valid-date" : "",
    time: formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : "",
  })

  const uploadImageIfNeeded = async (): Promise<string> => {
    if (!formData.image) return event!.publicUrl

    const { signedURL, publicURL } = await getPreSignedUrl(formData.image)

    if (event?.publicUrl) {
      await removeOldEventImage(event.publicUrl)
    }

    await uploadToS3(signedURL, formData.image)
    return publicURL
  }

  const buildEventData = (publicUrl: string): IEvent => ({
    id: event?.id,
    publicUrl,
    isoDate: selectedDate ? selectedDate.toISOString() : null,
    startTime: formData.startTime,
    endTime: formData.endTime,
    timezone: TIMEZONE,
    title: formData.title,
    description: formData.description,
    fullDescription: formData.fullDescription || undefined,
    location: formData.location,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const timeErrors = validateTimeFields()
    const dataToValidate = buildValidationData()

    const validationErrors = { ...validateEventForm(dataToValidate), ...timeErrors }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      console.log("Validation errors:", validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const publicUrl = await uploadImageIfNeeded()
      const eventData = buildEventData(publicUrl)
      onSubmit(eventData)
      handleClose()
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} event:`, error)
      setErrors({ submit: `Erro ao ${isEditing ? "atualizar" : "criar"} evento. Tente novamente.` })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      location: "",
      startTime: "",
      endTime: "",
    })
    setErrors({})
    setImagePreview(null)
    setSelectedDate(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-end p-6">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título do Evento *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Digite o título do evento"
              disabled={isSubmitting}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição Resumida *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Descrição breve que aparecerá nos cards do evento"
              disabled={isSubmitting}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Full Description */}
          <div>
            <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição Completa (Opcional)
            </label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullDescription ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Descrição detalhada que aparecerá no modal do evento"
              disabled={isSubmitting}
            />
            {errors.fullDescription && <p className="mt-1 text-sm text-red-600">{errors.fullDescription}</p>}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data *
            </label>
            <div className={`${errors.date ? "border-red-500 rounded-md" : ""}`}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                placeholderText="Selecione uma data"
                disabled={isSubmitting}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                isClearable
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Horário *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-xs text-gray-500 mb-1">
                  Início
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={(e) => handleTimeChange("startTime", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.startTime && <p className="mt-1 text-xs text-red-600">{errors.startTime}</p>}
              </div>

              <div>
                <label htmlFor="endTime" className="block text-xs text-gray-500 mb-1">
                  Fim
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endTime ? "border-red-500" : "border-gray-300"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.endTime && <p className="mt-1 text-xs text-red-600">{errors.endTime}</p>}
              </div>
            </div>

            {/* Preview do horário */}
            {formData.startTime && formData.endTime && (
              <div className="mt-2 text-sm text-gray-600">
                Horário: {formData.startTime.replace(":", "h")} - {formData.endTime.replace(":", "h")}
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Ex: Felipe A Maré Vida - Praia do Futuro"
              disabled={isSubmitting}
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Imagem do Evento {!isEditing && "*"}
            </label>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  disabled={isSubmitting}
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? "Clique para alterar a imagem" : "Clique para selecionar uma imagem"}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</span>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <ImageWithPlaceholder
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? "Salvando..." : "Criando..."}
                </>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Criar Evento"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
