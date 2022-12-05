import { SingleChoiceQuestion } from '@awell_health/ui-library'
import { useState } from 'react'

import type { Option, Question } from '@/types/generated/api.types'

interface SingleSelectProps {
  question: Question
}

export const SingleSelect = ({ question }: SingleSelectProps) => {
  //@ts-expect-error fix types
  const [value, setValue] = useState<Option>(question.options[0])

  return (
    <SingleChoiceQuestion
      label={question.title}
      options={question.options || []}
      onChange={(data) => setValue(data)}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
