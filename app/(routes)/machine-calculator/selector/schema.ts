import { z } from "zod"

export const FormSchema = z.object({
  formFields: z.array(
    z.object({
      material: z.string(),
      weight: z.number(),
    })
  ),
})

export type MaterialFormValues = z.infer<typeof FormSchema>

/*     const form = useForm<MaterialFormValues>({
    resolver: zodResolver(FormSchema),
  }) */