import { z } from 'zod'

export const materialSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  quantity: z.string(),
})

export type Material = z.infer<typeof materialSchema>
