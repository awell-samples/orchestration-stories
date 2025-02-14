import { InputField } from '@awell-health/ui-library'
import { useState } from 'react'

import { type Question } from '@/types/generated/api.types'

interface ShortTextProps {
  question: Question
}

export const ShortText = ({ question }: ShortTextProps) => {
  const [value, setValue] = useState('')

  return (
    <InputField
      type="text"
      onChange={(e) => setValue(e.target.value)}
      label={question.title}
      id={question.id}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
