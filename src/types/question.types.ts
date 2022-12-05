export type { AnswerInput, Option, Question } from './generated/api.types'
export {
  DataPointValueType,
  QuestionType,
  UserQuestionType,
} from './generated/api.types'

type SliderConfig = {
  display_marks: boolean
  is_value_tooltip_on: boolean
  max: number
  max_label: string
  min: number
  min_label: string
  show_min_max_values: boolean
  step_value: number
}

export type SliderQuestionConfig = {
  mandatory: boolean
  recode_enabled?: boolean
  slider: SliderConfig
}

export type QuestionConfig = {
  mandatory: boolean
  recode_enabled?: boolean
  slider?: null
}

export type OptionValue = string | number | boolean
