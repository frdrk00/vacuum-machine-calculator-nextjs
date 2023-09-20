'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

const materials = [
  { label: 'Salt', value: 'sa' },
  { label: 'Sugar', value: 'su' },
  { label: 'Flour', value: 'fl' },
  { label: 'Butter', value: 'bu' },
  { label: 'Milk', value: 'mi' },
  { label: 'Eggs', value: 'eg' },
  { label: 'Oil', value: 'oi' },
  { label: 'Garlic', value: 'ga' },
  { label: 'Onion', value: 'on' },
  { label: 'Tomato', value: 'to' },
  { label: 'Basil', value: 'ba' },
  { label: 'Lemon', value: 'le' },
  { label: 'Cinnamon', value: 'ci' },
  { label: 'Parsley', value: 'pa' },
  { label: 'Thyme', value: 'th' },
  { label: 'Paprika', value: 'pa' },
  { label: 'Ginger', value: 'gi' },
  { label: 'Honey', value: 'ho' },
  { label: 'Vanilla', value: 'va' },
  { label: 'Chili', value: 'ch' },
] as const

const FormSchema = z.object({
  formFields: z.array(
    z.object({
      material: z.string(),
      weight: z.number().min(0, 'Weight must be greater than or equal to 0.'),
    })
  )
})

type MaterialFormValues = z.infer<typeof FormSchema>

const SelectorPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { fields, append } = useFieldArray({
    name: 'formFields',
    control: form.control,
  })

  const onSubmit = (data: MaterialFormValues) => {
    const toastData = {
      title: 'You submitted the following values:',
      description: data.formFields.map((item, index) => (
          
        <div key={index} className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Material {index + 1}: {item.material}, Weight: {item.weight} grams
          </code>
        </div>
      )),
    }
    toast(toastData)
  }



  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}  className="w-full space-y-6">
        <FormLabel>Materials</FormLabel>
        <div className="w-full space-y-2">
          {fields.map((field, index) => (
            <div key={index}>
              <FormField
                key={field.id}
                control={form.control}
                name={`formFields.${index}.material`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? materials.find(
                                    (material) => material.value === field.value
                                  )?.label
                                : 'Select material'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search material..." />
                            <CommandEmpty>No materials found.</CommandEmpty>
                            <CommandGroup>
                              {materials.map((material) => (
                                <CommandItem
                                  value={material.label}
                                  key={material.value}
                                  onSelect={() => {
                                    form.setValue(
                                      `formFields.${index}.material`,
                                      material.value
                                    )
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      material.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {material.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className="w-full flex justify-self-start text-center items-center">
                        <FormField
                          control={form.control}
                          name={`formFields.${index}.weight`}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Enter weight"
                              />
                            </FormControl>
                          )}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ material: '', weight: 0 })}
          >
            Add next material
          </Button>
          <div className="flex space-x-2">
{/*             <Button variant="destructive" onClick={resetForm}>
              Reset
            </Button> */}
          </div>
        </div>
            <Button variant="default" type="submit">
              Create recipe
            </Button>
      </form>
    </Form>
  )
}

export default SelectorPage
