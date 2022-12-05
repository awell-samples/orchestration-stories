import { InputField } from '@awell_health/ui-library'
import { useState } from 'react'

import { type Question } from '../../../../../types/generated/api.types'

interface SliderProps {
  question: Question
}

export const NumberComponent = ({ question }: SliderProps) => {
  const [value, setValue] = useState<undefined | number>(undefined)

  return (
    <InputField
      type="number"
      onChange={(e) => setValue(Number(e.target.value))}
      label={question.title}
      id={question.id}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
