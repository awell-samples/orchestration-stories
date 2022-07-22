import { useEffect } from 'react'

import { Loading } from '@/components/Loading'

import {
  FormActivityProvider,
  useFormActivityContext,
} from '../../../contexts/FormActivityContext'
import { useForm as useFormQuery } from '../../../hooks/awell-orchestration/useForm'
import { QuestionWithVisibility } from '../../../types/form.types'
import { type Activity } from '../../../types/generated/api.types'
import { KioskButton } from '../../Button/variants'
import { FormSkeleton } from '../../Skeleton'
import {
  Boolean,
  Date,
  Description,
  LongText,
  MultipleSelect,
  Number,
  ShortText,
  SingleSelect,
  Slider,
} from './QuestionTypes'

interface FormProps {
  formActivity: Activity
  onActivityCompleted: () => void
}

const Question = ({
  questionObject,
}: {
  questionObject: QuestionWithVisibility
}) => {
  const { currentQuestion, visibleQuestions } = useFormActivityContext()
  const percentageCompleted = Math.round(
    (currentQuestion / visibleQuestions.length) * 100
  )
  const renderQuestion = () => {
    switch (questionObject.userQuestionType) {
      case 'NUMBER':
        return <Number question={questionObject} />
      case 'LONG_TEXT':
        return <LongText question={questionObject} />
      case 'DATE':
        return <Date question={questionObject} />
      case 'MULTIPLE_CHOICE':
        return <SingleSelect question={questionObject} />
      case 'YES_NO':
        return <Boolean question={questionObject} />
      case 'SHORT_TEXT':
        return <ShortText question={questionObject} />
      case 'SLIDER':
        return <Slider question={questionObject} />
      case 'DESCRIPTION':
        return <Description question={questionObject} />
      case 'MULTIPLE_SELECT':
        return <MultipleSelect question={questionObject} />
      default:
        return (
          <div>
            Question with type ${questionObject.userQuestionType} is not
            supported.
          </div>
        )
    }
  }

  return (
    <div className="flex flex-grow flex-col">
      <div className="container mb-8">
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{
              width: `${
                percentageCompleted === 0 ? '25px' : percentageCompleted + '%'
              }`,
            }}
          >
            {percentageCompleted}%
          </div>
        </div>
      </div>
      {renderQuestion()}
    </div>
  )
}

const Form = ({ onActivityCompleted }: { onActivityCompleted: () => void }) => {
  const {
    areAllQuestionsCompleted,
    isFormSubmitted,
    isSubmittingForm,
    visibleQuestions,
    isLoadingQuestions,
    submitForm,
    currentQuestion,
  } = useFormActivityContext()

  /**
   * If form is submitted,
   * go to next activity
   */
  useEffect(() => {
    if (isFormSubmitted) {
      onActivityCompleted()
    }
  }, [isFormSubmitted])

  if (isLoadingQuestions || isSubmittingForm) return <Loading />

  if (areAllQuestionsCompleted) {
    return (
      <div className="grow flex flex-col">
        <div className="container grow">
          <h1 className="text-slate-800 text-5xl">Form completed</h1>
          <p className="text-slate-600 text-3xl pt-2">
            Press the button below to submit your responses
          </p>
        </div>
        <div className="">
          <KioskButton
            label="Submit form response"
            onClick={() => submitForm()}
            color="blue"
            disabled={false}
          />
        </div>
      </div>
    )
  }

  const currentQuestionObject = visibleQuestions[currentQuestion]

  if (currentQuestionObject) {
    return <Question questionObject={currentQuestionObject} />
  }

  return <div>Not able to find a current question object.</div>
}

export const FormContainer = ({
  formActivity,
  onActivityCompleted,
}: FormProps) => {
  const { form, loading } = useFormQuery(formActivity.object.id)

  if (loading) {
    return <FormSkeleton />
  }

  return (
    <FormActivityProvider
      formActivity={formActivity}
      questions={form.questions}
    >
      <Form onActivityCompleted={onActivityCompleted} />
    </FormActivityProvider>
  )
}
