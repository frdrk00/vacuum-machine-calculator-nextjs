'use client'

import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-8 px-6 pt-2">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-gray-500">
          Select day and check massage programs for that day
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  )
}

export default CalendarPage
