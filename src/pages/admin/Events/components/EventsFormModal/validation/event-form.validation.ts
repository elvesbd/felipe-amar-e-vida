export const validateEventForm = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {}

  // Title validation
  if (!formData.title?.trim()) {
    errors.title = "Título é obrigatório"
  } else if (formData.title.trim().length < 3) {
    errors.title = "Título deve ter pelo menos 3 caracteres"
  }

  // Description validation
  if (!formData.description?.trim()) {
    errors.description = "Descrição é obrigatória"
  } else if (formData.description.trim().length < 10) {
    errors.description = "Descrição deve ter pelo menos 10 caracteres"
  }

  // Date validation
  if (!formData.date) {
    errors.date = "Data é obrigatória"
  }

  // Time validation
  if (!formData.time) {
    errors.time = "Horário é obrigatório"
  }

  // Location validation
  if (!formData.location?.trim()) {
    errors.location = "Local é obrigatório"
  }

  return errors
}
