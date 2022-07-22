import { useFormActivityContext } from '../../../../../contexts/FormActivityContext'
import { type Question } from '../../../../../types/generated/api.types'
import { KioskButton } from '../../../../Button/variants'

interface DescriptionProps {
  question: Question
}

export const Description = ({ question }: DescriptionProps) => {
  const { goToNextQuestion } = useFormActivityContext()

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <div>{question.title}</div>
      </div>
      <div className="">
        <KioskButton
          label="Next"
          onClick={() => goToNextQuestion()}
          color="blue"
          disabled={false}
        />
      </div>
    </div>
  )
}
