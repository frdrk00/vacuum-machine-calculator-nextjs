'use client'

import axios from 'axios'
import * as z from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wand2 } from 'lucide-react'

import { formSchema } from './schema'
import { types } from '../table/data/data'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const CreateMaterial = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: '',
      quantity: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await axios.post('/api/materials', values)

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center flex-col space-y-2">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-start uppercase text-xs font-bold text-black dark:text-zinc-500 dark:text-secondary/70">
                    Ingredient Type
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={`${type.label.toLocaleLowerCase()}`}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-start uppercase text-xs font-bold text-black dark:text-zinc-500 dark:text-secondary/70">
                    Material Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="bg-transparent border focus-visible:ring-0 dark:text-white text-black focus-visible:ring-offset-0"
                      placeholder="Enter title your ingredient ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-start uppercase text-xs font-bold text-black dark:text-zinc-500 dark:text-secondary/70">
                    Material Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="bg-transparent border focus-visible:ring-0 dark:text-white text-black focus-visible:ring-offset-0"
                      placeholder="Enter quantity your ingredient ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="w-full flex justify-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                        <FileUpload
                          endpoint="materialImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}

          <div className="w-full flex justify-center">
            <Button size="lg" disabled={loading} className="dark:bg-gray-400">
              Create
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateMaterial
