import { MultipleChoiceQuestion } from '@awell-health/ui-library'
import { useState } from 'react'

import type { Option, Question } from '@/types/generated/api.types'

interface MultipleSelectProps {
  question: Question
}

export const MultipleSelect = ({ question }: MultipleSelectProps) => {
  const [value, setValue] = useState<Option[]>([])

  return (
    <MultipleChoiceQuestion
      label={question.title}
      options={question.options || []}
      // @ts-expect-error - TODO: fix this
      onChange={(data) => setValue(data)}
      values={value}
      mandatory={question.questionConfig?.mandatory}
      questionId={question.id}
    />
  )
}
