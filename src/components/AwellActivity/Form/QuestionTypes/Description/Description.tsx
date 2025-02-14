import { Description } from '@awell-health/ui-library'

import { type Question } from '../../../../../types/generated/api.types'

interface DescriptionProps {
  question: Question
}

export const DescriptionComponent = ({ question }: DescriptionProps) => {
  //@ts-expect-error fix later
  return <Description nodes={question.title} />
}
