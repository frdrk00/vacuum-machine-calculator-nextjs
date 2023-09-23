import * as z from 'zod'

export const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(50),
  type: z
    .string()
    .min(1, {
      message: 'Type is required',
    })
    .max(500),
  quantity: z.string().min(1, {
    message: 'Quantity is required',
  }),
})
