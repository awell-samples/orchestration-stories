import { type Question, Option } from './generated/api.types'

export type QuestionWithVisibility = Question & { visible: boolean }

export type AnswerValue = boolean | number | string | Option | Option[]
