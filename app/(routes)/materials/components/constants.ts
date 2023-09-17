import * as z from 'zod'

export const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(50),
  description: z
    .string()
    .min(1, {
      message: 'Description is required',
    })
    .max(500),
})
