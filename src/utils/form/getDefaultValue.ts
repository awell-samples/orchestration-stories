import { type AnswerValue } from '../../types/form.types'
import { Question, UserQuestionType } from '../../types/generated/api.types'

export const getDefaultValue = (question: Question): AnswerValue => {
  switch (question.userQuestionType) {
    case UserQuestionType.YesNo:
      return false
    case UserQuestionType.MultipleSelect:
      return []
    case UserQuestionType.Slider:
      return (
        JSON.stringify(question.questionConfig?.slider?.min) ??
        JSON.stringify(0)
      )
    default:
      return ''
  }
}
