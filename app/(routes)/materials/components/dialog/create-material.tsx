'use client'

import axios from 'axios'
import * as z from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wand2 } from 'lucide-react'

import { formSchema } from './constants'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import FileUpload from './file-upload'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
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
      description: '',
      imageUrl: '',
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

  // console.log(form.formState.errors)

  return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center md:space-x-5 max-sm:flex-col max-sm:space-y-2">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="max-sm:w-full">
                    <FormLabel className="flex justify-start uppercase text-xs font-bold text-black dark:text-zinc-500 dark:text-secondary/70">
                      Ingredient Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className="bg-transparent border focus-visible:ring-0 dark:text-white text-black focus-visible:ring-offset-0"
                        placeholder="Enter name your ingredient ..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs max-sm:w-full max-sm:flex max-sm:justify-start max-sm:ml-2">
                      It should be between 1 and 50 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="max-sm:w-full">
                    <FormLabel className="flex justify-start uppercase text-xs font-bold text-black dark:text-zinc-500 dark:text-secondary/70">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className="bg-transparent border focus-visible:ring-0 dark:text-white text-black focus-visible:ring-offset-0"
                        placeholder="Enter description your ingredient ..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs max-sm:w-full max-sm:flex max-sm:justify-start max-sm:ml-2">
                      It should be between 1 and 500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center">
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
            </div>

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
