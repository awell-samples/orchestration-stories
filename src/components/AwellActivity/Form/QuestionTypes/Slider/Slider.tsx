import { RangeInput } from '@awell-health/ui-library'
import { useState } from 'react'

import type { Question } from '@/types/generated/api.types'
import type { SliderQuestionConfig } from '@/types/question.types'

interface SliderProps {
  question: Question
}

export const Slider = ({ question }: SliderProps) => {
  const [value, setValue] = useState<undefined | number>(undefined)
  const config = question.questionConfig

  return (
    <RangeInput
      label={question.title}
      onChange={(e) => setValue(Number(e.target.value))}
      id={question.id}
      sliderConfig={(config as SliderQuestionConfig)?.slider}
      value={value}
      mandatory={question.questionConfig?.mandatory}
    />
  )
}
