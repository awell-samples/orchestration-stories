import { useMutation } from '@apollo/client'

import type {
  AnswerInput,
  QuestionRuleResult,
} from '../../../types/generated/api.types'
import { EVALUATE_FORM_RULES } from './graphql/EvaluateFormRules.graphql'

export const useEvaluateFormRules = (
  formId: string
): [(answers: Array<AnswerInput>) => Promise<Array<QuestionRuleResult>>] => {
  const [evaluateFormRules] = useMutation(EVALUATE_FORM_RULES)

  return [
    async (answers: Array<AnswerInput>): Promise<Array<QuestionRuleResult>> => {
      try {
        const { data } = await evaluateFormRules({
          variables: {
            input: {
              form_id: formId,
              answers,
            },
          },
        })
        return data.evaluateFormRules.results
      } catch (error) {
        console.log(error)
        return []
      }
    },
  ]
}
