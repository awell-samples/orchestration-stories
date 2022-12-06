import { SingleChoiceQuestion } from '@awell_health/ui-library'
import { useState } from 'react'

import type { Option, Question } from '@/types/generated/api.types'

interface SingleSelectProps {
  question: Question
}

export const SingleSelect = ({ question }: SingleSelectProps) => {
  const [value, setValue] = useState<Option | null>(null)

  return (
    <SingleChoiceQuestion
      questionId={question.id}
      label={question.title}
      options={question.options || []}
      onChange={(data) => setValue(data)}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
