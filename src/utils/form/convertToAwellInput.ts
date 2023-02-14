import { AnswerValue } from '@/types/form.types'
import { AnswerInput } from '@/types/question.types'

const ensureString = (answer: AnswerValue): string => {
  if (typeof answer === 'string') {
    return answer
  }

  if (typeof answer === 'number') {
    return String(answer)
  }

  if (typeof answer === 'boolean') {
    return answer ? '1' : '0'
  }

  if (Array.isArray(answer)) {
    return JSON.stringify(answer.map(({ value }) => value))
  }

  if (typeof answer.value === 'boolean') {
    return answer.value ? '1' : '0'
  }

  return JSON.stringify(answer?.value)
}

export const convertToAwellInput = (
  formResponse: Record<string, AnswerValue>
): Array<AnswerInput> => {
  const answers = Object.keys(formResponse).map((question_id) => ({
    question_id,
    value: ensureString(formResponse[question_id]),
  }))

  return answers
}
