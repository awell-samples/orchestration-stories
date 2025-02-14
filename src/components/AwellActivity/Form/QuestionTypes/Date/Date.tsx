import { DatePicker } from '@awell-health/ui-library'
import { useState } from 'react'

import { type Question } from '@/types/generated/api.types'

interface DateProps {
  question: Question
}

export const DateComponent = ({ question }: DateProps) => {
  const [value, setValue] = useState<string | null>(null)

  const dateValue = value !== null ? new Date(value) : null

  return (
    <DatePicker
      label={question.title}
      onChange={(data) => setValue(data)}
      id={question.id}
      value={dateValue}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
