import { z } from "zod"

export const photoSchema = z.object({
  photos: z
    .array(
      z.object({
        file: z.instanceof(File),
        altText: z
          .string()
          .min(10, "Descrição deve ter pelo menos 10 caracteres")
          .max(200, "Descrição deve ter no máximo 200 caracteres"),
      }),
    )
    .min(1, "Selecione pelo menos uma foto"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

export type PhotoFormData = z.infer<typeof photoSchema>