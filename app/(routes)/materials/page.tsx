'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Loading from './loading'

import DialogWindow from './components/dialog/dialog-window'

import { DataTable } from './components/table/components/data-table'
import { columns } from './components/table/components/columns'

const MaterialsPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    try {
      setLoading(true)
      axios.get('/api/materials').then((res) => setMaterials(res.data))
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
          <DialogWindow />
        </div>
      </div>
      <div className="md:w-full p-4">
        {isLoading ? <Loading /> : <DataTable data={materials} columns={columns} />}
      </div>
    </>
  )
}

export default MaterialsPage
