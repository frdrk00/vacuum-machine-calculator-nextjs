'use client'

import ConversationPage from '@/app/(routes)/materials/components/create-material'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { columns } from './components/table/components/columns'
import { DataTable } from './components/table/components/data-table'
import { taskSchema } from './components/table/data/schema'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './loading'

const MaterialsPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    try {
      setLoading(true)
      axios.get('/api/materials').then((res) => setTasks(res.data))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <div className="flex justify-between px-6 pt-2">
        <div>
          <h1 className="text-3xl font-bold">Materials</h1>
          <p className="text-gray-500">
            List of materials you can use in your recipes
          </p>
        </div>
        <div className="md:flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Material</DialogTitle>
                <DialogDescription>
                  Create a new material for your recipes
                </DialogDescription>
              </DialogHeader>
              <ConversationPage />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:w-full p-4">
        {isLoading ? <Loading /> : <DataTable data={tasks} columns={columns} />}
      </div>
    </>
  )
}

export default MaterialsPage
