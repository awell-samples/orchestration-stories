import { useForm } from 'react-hook-form'

import { useFormActivityContext } from '../../../../../contexts/FormActivityContext'
import { type Question } from '../../../../../types/generated/api.types'
import { KioskButton } from '../../../../Button/variants'
import { Label } from '../Atoms'

interface DateProps {
  question: Question
}

export const Date = ({ question }: DateProps) => {
  const { goToNextQuestion, appendFormData } = useFormActivityContext()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' })

  const onQuestionSubmit = () => {
    handleSubmit(async (data) => {
      await appendFormData(data)
      goToNextQuestion()
    })()
  }

  return (
    <div className="grow flex flex-col">
      <form
        className="grow flex flex-col"
        onSubmit={handleSubmit(onQuestionSubmit)}
      >
        <div className="container grow">
          <Label
            htmlFor={question.id}
            label={question.title}
            mandatory={question.questionConfig?.mandatory}
          />
          <div className="my-4">
            <input
              {...register(question.id, {
                required: question.questionConfig?.mandatory,
              })}
              id={question.id}
              type="date"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors?.[question.id] && (
              <p className="text-red-500">{question.title} is required</p>
            )}
          </div>
        </div>
        <div className="">
          <KioskButton
            label="Next"
            type="submit"
            color="blue"
            disabled={false}
          />
        </div>
      </form>
    </div>
  )
}
