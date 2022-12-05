import { Description } from '@awell_health/ui-library'

import { type Question } from '../../../../../types/generated/api.types'

interface DescriptionProps {
  question: Question
}

export const DescriptionComponent = ({ question }: DescriptionProps) => {
  return <Description nodes={question.title} />
}
