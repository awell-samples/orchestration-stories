import { Button, ProgressIndicator, Question } from '@awell_health/ui-library'
import { FormError } from '@awell_health/ui-library/dist/types/types'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useForm as UseReactHookForm } from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { useEvaluateFormRules } from '@/hooks/awell-orchestration/useEvaluateFormRules'
import { useForm } from '@/hooks/awell-orchestration/useForm'
import { QuestionWithVisibility } from '@/types/form.types'
import { Form, UserQuestionType } from '@/types/generated/api.types'
import {
  calculatePercentageCompleted,
  convertToAwellInput,
  getInitialValues,
  updateVisibility,
} from '@/utils/form'

const Form: FC<{ form: Form }> = (form) => {
  const [current, setCurrent] = useState(0)
  const [isEvaluatingQuestionVisibility, setIsEvaluatingQuestionVisibility] =
    useState<boolean>(true)
  const [errors, setErrors] = useState<Array<FormError>>([])
  const [percentageCompleted, setPercentageCompleted] = useState(0)

  const { getValues, control } = UseReactHookForm({
    defaultValues: getInitialValues(form.form.questions),
    shouldUnregister: false,
  })

  const [visibleQuestions, setVisibleQuestions] = useState<
    Array<QuestionWithVisibility>
  >([])

  const [evaluateFormRules] = useEvaluateFormRules(form.form.id)

  const updateQuestionVisibility = useCallback(async () => {
    setIsEvaluatingQuestionVisibility(true)
    const formValuesInput = convertToAwellInput(getValues())
    const evaluationResults = await evaluateFormRules(formValuesInput)
    const updatedQuestions = updateVisibility(
      form.form.questions,
      evaluationResults
    ).filter((e) => e.visible)

    setVisibleQuestions(updatedQuestions)
    setIsEvaluatingQuestionVisibility(false)

    return updatedQuestions
  }, [form.form.questions])

  const handleCheckForErrors = (): boolean => {
    const currentQuestion = visibleQuestions?.[current]
    const errorsWithoutCurrent = errors.filter(
      (err) => err.id !== currentQuestion?.id
    )

    setErrors(errorsWithoutCurrent)

    /**
     * Description question types can't have validation errors
     */
    if (currentQuestion?.userQuestionType === UserQuestionType.Description) {
      return false
    }

    if (
      currentQuestion?.questionConfig?.mandatory &&
      isEmpty(getValues(currentQuestion.id))
    ) {
      const errorsWithoutCurrent = errors.filter(
        (err) => err.id !== currentQuestion.id
      )

      setErrors([
        ...errorsWithoutCurrent,
        { id: currentQuestion.id, error: 'This question is required.' },
      ])

      return true
    }
    return false
  }

  const handleGoToNextQuestion = async () => {
    await updateQuestionVisibility().finally(() => {
      const hasErrors = handleCheckForErrors()

      if (!hasErrors) {
        setCurrent(current + 1)
      }
    })
    if (current === -1) {
      setCurrent(current + 1)
    }
  }

  const handleGoToPrevQuestion = () => {
    setCurrent(current - 1)
  }

  const submitForm = async () => {
    await updateQuestionVisibility().then((updatedQuestions) => {
      // check if there are new visible questions after evaluating rules
      const doNextQuestionExist = current !== updatedQuestions.length - 1
      if (doNextQuestionExist) {
        return handleGoToNextQuestion()
      }

      // check if there are any errors
      const hasErrors = handleCheckForErrors()
      if (!hasErrors) {
        alert('Mock submit form response. Check the console for the payload.')
        console.log({
          input: {
            activity_id: '{{FORM_ACTIVITY_ID}}',
            response: convertToAwellInput(getValues()),
          },
        })
      }
    })
  }

  const init = async () => {
    await updateQuestionVisibility()
    setIsEvaluatingQuestionVisibility(false)
  }

  /**
   * Compute percentage completed of the form every
   * time we navigate between questions.
   */
  useEffect(() => {
    const percentageCompletedTemp = calculatePercentageCompleted({
      currentQuestionId: visibleQuestions?.[current]?.id || '',
      allQuestions: form.form.questions,
    })

    setPercentageCompleted(percentageCompletedTemp)
  }, [current])

  useEffect(() => {
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="max-w-lg mx-auto">
      <Link href="/stories/form">
        <a
          title="View form in Traditional mode"
          className="block text-sm text-blue-600 underline mb-4"
        >
          View form in Traditional mode
        </a>
      </Link>
      <div className="rounded-md bg-blue-50 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              Please note that is merely a code example demonstrating how you
              could leverage Awell&apos;s API to display a Conversational form.
              This is not a production-ready component.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {form.form.title}
      </h1>
      <div className="my-6">
        <ProgressIndicator
          percentageCompleted={percentageCompleted}
          showPercentage={false}
        />
      </div>
      {isEvaluatingQuestionVisibility ? (
        <div className="flex justify-center text-center">
          <Spinner size="lg" message="Deciding which questions to show..." />
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <Question
            // @ts-expect-error fix typing
            question={visibleQuestions?.[current]}
            // @ts-expect-error fix typing
            control={control}
            getValues={getValues}
            key={visibleQuestions?.[current].id}
            errors={errors}
          />
        </div>
      )}
      <div className="mt-12 flex justify-between">
        <div>
          {current !== 0 && (
            <Button
              variant="tertiary"
              onClick={handleGoToPrevQuestion}
              data-cy="navigateToPrevQuestionButton"
            >
              Previous
            </Button>
          )}
        </div>
        <div>
          {current === visibleQuestions.length - 1 ? (
            <Button
              onClick={submitForm}
              type="submit"
              data-cy="submitFormButton"
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={handleGoToNextQuestion}
              data-cy="navigateToNextQuestionButton"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ConversationalFormPage() {
  const { form, loading } = useForm('T2H6OwGaqbPN')

  if (loading) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Loading form" />
      </div>
    )
  }

  return <Form form={form} />
}

ConversationalFormPage.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
