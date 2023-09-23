'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

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

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../loading'

interface FormValues {
  formFields: {
    material: string
    weight: string
  }[]
}

interface Material {
  id: string
  type: string
  title: string
}

const SelectorPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [materials, setMaterials] = useState<Material[]>([])

  console.log(materials.map((material) => material.id))

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/materials')
      setMaterials(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const form = useForm<FormValues>({
    defaultValues: {
      formFields: [
        {
          material: '',
          weight: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'formFields',
    control: form.control,
  })

  const onSubmit = (data: FormValues) => {
    const toastData = {
      title: 'You submitted the following values:',
      description: data.formFields.map((item, index) => {
        const selectedMaterial = materials.find(
          (material) => material.id === item.material
        )
        const materialTitle = selectedMaterial
          ? selectedMaterial.title
          : 'Unknown Material'
        const weight = item.weight ? `${item.weight} grams` : 'Unknown Weight'

        return (
          <div
            key={index}
            className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"
          >
            <code className="text-white">
              Material {index + 1}: {materialTitle}, Weight: {weight}
            </code>
          </div>
        )
      }),
    }
    toast(toastData)
    console.log(data)
  }

  const resetForm = () => {
    form.reset({
      formFields: [
        {
          material: '',
          weight: '',
        },
      ],
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <FormLabel>Materials</FormLabel>
        <div className="flex flex-col w-full space-y-2">
          {fields.map((field, index) => (
            <div className="flex w-full justify-between space-x-2" key={field.id}>
              <FormField
                key={field.id}
                control={form.control}
                name={`formFields.${index}.material` as const}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
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
                                    (material) => material.id === field.value
                                  )?.title
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
                                  value={material.id}
                                  key={material.id}
                                  onSelect={() => {
                                    form.setValue(
                                      `formFields.${index}.material` as const,
                                      material.id
                                    )
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      material.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {material.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className="w-full flex justify-self-start text-center items-center">
                        <FormField
                          control={form.control}
                          name={`formFields.${index}.weight` as const}
                          render={({ field }) => (
                            <FormControl>
                              <Input {...field} placeholder="Enter weight" />
                            </FormControl>
                          )}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    <X className="ml-[-6px] h-6 w-6 text-red" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => append({ material: '', weight: '' })}
            >
              Add Material
            </Button>
            <Button type="button" variant="destructive" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SelectorPage
