import { AnswerValue } from '@/types/form.types'
import { AnswerInput } from '@/types/question.types'

const ensureString = (val: AnswerValue) =>
  typeof val === 'string' ? val : JSON.stringify(val)

export const convertToAwellInput = (
  formResponse: Record<string, AnswerValue>
): Array<AnswerInput> => {
  const answers = Object.keys(formResponse).map((question_id) => ({
    question_id,
    value: ensureString(formResponse[question_id]),
  }))
  return answers
}
