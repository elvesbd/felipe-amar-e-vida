import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail deve ter um formato válido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres"),
})

export type LoginFormData = z.infer<typeof loginSchema>