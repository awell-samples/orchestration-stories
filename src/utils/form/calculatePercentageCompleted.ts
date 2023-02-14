import { Question } from '@/types/question.types'

interface CalculatePercentageCompletedProps {
  currentQuestionId: string
  allQuestions: Question[]
}

export const calculatePercentageCompleted = ({
  currentQuestionId,
  allQuestions,
}: CalculatePercentageCompletedProps): number => {
  const currentQuestionIndex = allQuestions.findIndex(
    (q) => q.id === currentQuestionId
  )

  /**
   * Return 0 if question cannot be found.
   * Should theoretically never happen.
   */
  if (currentQuestionIndex === -1) {
    return 0
  }

  return Math.round(((currentQuestionIndex + 1) / allQuestions.length) * 100)
}
