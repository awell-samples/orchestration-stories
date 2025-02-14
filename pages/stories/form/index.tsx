import { Button, Question } from '@awell-health/ui-library'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { debounce, isEmpty } from 'lodash'
import Link from 'next/link'
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm as UseReactHookForm } from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { useEvaluateFormRules } from '@/hooks/awell-orchestration/useEvaluateFormRules'
import { useForm } from '@/hooks/awell-orchestration/useForm'
import { AnswerValue, QuestionWithVisibility } from '@/types/form.types'
import { type Form } from '@/types/generated/api.types'
import {
  convertFormErrorsToAwellErrors,
  convertToAwellInput,
  updateVisibility,
} from '@/utils/form'

const Form: FC<{ form: Form }> = (form) => {
  const [isLoading, setIsLoading] = useState(true)

  const {
    getValues,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = UseReactHookForm({
    shouldUnregister: false,
  })

  const [visibleQuestions, setVisibleQuestions] = useState<
    Array<QuestionWithVisibility>
  >([])

  const [evaluateFormRules] = useEvaluateFormRules(form.form.id)

  const updateQuestionVisibility = useCallback(async () => {
    const formValuesInput = convertToAwellInput(getValues())

    const evaluationResults = await evaluateFormRules(formValuesInput)
    setVisibleQuestions(
      updateVisibility(form.form.questions, evaluationResults).filter(
        (e) => e.visible
      )
    )
  }, [form.form.questions])

  const debouncedUpdateQuestionsVisibility = useMemo(
    () =>
      debounce(async () => {
        await updateQuestionVisibility()
      }, 750),
    []
  )

  const handleFormChange = () => {
    debouncedUpdateQuestionsVisibility()
  }

  const onSubmit = (data: Record<string, AnswerValue>) => {
    alert('Mock submit form response. Check the console for the payload.')
    console.log({
      input: {
        activity_id: '{{FORM_ACTIVITY_ID}}',
        response: convertToAwellInput(data),
      },
    })
  }

  const init = async () => {
    await updateQuestionVisibility()
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    watch(() => handleFormChange())
  }, [watch])

  if (isLoading) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Deciding which questions to show..." />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <Link href="/stories/conversational-form">
        <a
          title="View form in Conversational mode"
          className="block text-sm text-blue-600 underline mb-4"
        >
          View form in Conversational mode
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
              could leverage Awell&apos;s API to display a Traditional form.
              This is not a production-ready component.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {form.form.title}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-8">
          {visibleQuestions.map((visibleQuestion) => {
            return (
              <div key={visibleQuestion.id}>
                <Question
                  question={visibleQuestion}
                  control={control}
                  getValues={getValues}
                  key={visibleQuestion.id}
                  errors={convertFormErrorsToAwellErrors(errors)}
                />
              </div>
            )
          })}
        </div>
        {!isEmpty(errors) && (
          <div className="mt-6 text-red-600">
            <p>There are errors in your form, please resolve them first.</p>
          </div>
        )}
        <div className="mt-12">
          <Button onClick={() => null} type="submit" fullWidth={true}>
            Submit form
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function FormPage() {
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

FormPage.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
