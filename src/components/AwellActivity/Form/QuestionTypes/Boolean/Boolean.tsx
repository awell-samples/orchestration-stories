import { SingleChoiceQuestion } from '@awell_health/ui-library'
import { useState } from 'react'

import { type Question, Option } from '@/types/generated/api.types'

interface BooleanProps {
  question: Question
}

export const Boolean = ({ question }: BooleanProps) => {
  const [value, setValue] = useState<Option | null>(null)

  const options = [
    { id: `${question.id}-yes`, value: 1, label: 'yes' },
    { id: `${question.id}-no`, value: 0, label: 'no' },
  ]

  return (
    <SingleChoiceQuestion
      label={question.title}
      options={options}
      onChange={(data) => setValue(data)}
      value={value}
      mandatory={question.questionConfig?.mandatory}
      questionId={question.id}
    />
  )
}
