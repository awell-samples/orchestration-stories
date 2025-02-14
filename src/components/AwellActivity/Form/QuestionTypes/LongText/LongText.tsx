import { LongTextField } from '@awell-health/ui-library'
import { useState } from 'react'

import { type Question } from '@/types/generated/api.types'

interface LongTextProps {
  question: Question
}

export const LongText = ({ question }: LongTextProps) => {
  const [value, setValue] = useState('')

  return (
    <LongTextField
      onChange={(e) => setValue(e.target.value)}
      label={question.title}
      id={question.id}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
