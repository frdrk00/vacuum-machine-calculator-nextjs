'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface MainInputProps {
  onValueChange: (value: string) => void
}

const MainInput = ({ onValueChange }: MainInputProps) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Input
      placeholder="Recipe name"
      value={inputValue}
      onChange={(e) => {
        const value = e.target.value
        setInputValue(value)
        onValueChange(value)
      }}
    />
  )
}

export default MainInput
