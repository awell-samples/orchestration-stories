import {
  Button,
  DatePicker,
  Description,
  InputField,
  LongTextField,
  MultipleChoiceQuestion,
  RangeInput,
  SingleChoiceQuestion,
} from '@awell_health/ui-library'
import { debounce, isArray, isNil } from 'lodash'
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Control,
  Controller,
  useForm as UseReactHookForm,
} from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { useEvaluateFormRules } from '@/hooks/awell-orchestration/useEvaluateFormRules'
import { useForm } from '@/hooks/awell-orchestration/useForm'
import { AnswerValue, QuestionWithVisibility } from '@/types/form.types'
import { Form } from '@/types/generated/api.types'
import {
  convertToAwellInput,
  getInitialValues,
  updateVisibility,
} from '@/utils/form'

const FormQuestion = ({
  question,
  control,
  onFormChange,
}: {
  question: QuestionWithVisibility
  control: Control<Record<string, AnswerValue>, object>
  onFormChange: () => void
}) => {
  const renderQuestion = () => {
    switch (question.userQuestionType) {
      case 'NUMBER':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="number"
                onChange={(e) => {
                  onFormChange()
                  onChange(Number(e.target.value))
                }}
                label={question.title}
                id={question.id}
                value={Number(value)}
                mandatory={question.questionConfig?.mandatory}
              />
            )}
          />
        )
      case 'LONG_TEXT':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => (
              <LongTextField
                onChange={(e) => {
                  onFormChange()
                  onChange(e)
                }}
                label={question.title}
                id={question.id}
                value={String(value)}
                mandatory={question.questionConfig?.mandatory}
              />
            )}
          />
        )
      case 'DATE':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => {
              const dateValue =
                typeof value === 'string' ? new Date(value) : null

              return (
                <DatePicker
                  onChange={(e) => {
                    onFormChange()
                    onChange(e)
                  }}
                  label={question.title}
                  id={question.id}
                  value={dateValue}
                  mandatory={question.questionConfig?.mandatory}
                />
              )
            }}
          />
        )
      case 'MULTIPLE_CHOICE':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => {
              const option =
                question.options?.find((option) => option.value === value) ||
                null

              return (
                <SingleChoiceQuestion
                  questionId={question.id}
                  label={question.title}
                  options={question.options || []}
                  onChange={(e) => {
                    const newValue = isNil(e?.value) ? '' : e?.value

                    onChange(newValue)
                    onFormChange()
                  }}
                  value={option}
                  mandatory={question.questionConfig?.mandatory}
                />
              )
            }}
          />
        )
      case 'YES_NO':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => {
              const options = [
                { id: `${question.id}-yes`, value: 1, label: 'yes' },
                { id: `${question.id}-no`, value: 0, label: 'no' },
              ]

              const option =
                options?.find((option) => Boolean(option.value) === value) ||
                null

              return (
                <SingleChoiceQuestion
                  questionId={question.id}
                  label={question.title}
                  options={options || []}
                  onChange={(e) => {
                    const newValue = e?.value || ''

                    onChange(Boolean(newValue))
                    onFormChange()
                  }}
                  value={option}
                  mandatory={question.questionConfig?.mandatory}
                />
              )
            }}
          />
        )
      case 'SHORT_TEXT':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="text"
                onChange={(e) => {
                  onFormChange()
                  onChange(e)
                }}
                label={question.title}
                id={question.id}
                value={String(value)}
                mandatory={question.questionConfig?.mandatory}
              />
            )}
          />
        )
      case 'SLIDER':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => (
              <RangeInput
                label={question.title}
                onChange={(e) => {
                  onFormChange()
                  onChange(Number(e.target.value))
                }}
                id={question.id}
                //@ts-expect-error fix typing here
                sliderConfig={question.questionConfig?.slider}
                value={Number(value)}
                mandatory={question.questionConfig?.mandatory}
              />
            )}
          />
        )
      case 'DESCRIPTION':
        return <Description nodes={question.title} />
      case 'MULTIPLE_SELECT':
        return (
          <Controller
            control={control}
            name={question.id}
            render={({ field: { onChange, value } }) => {
              const valuesArray = isArray(value) ? value : []

              const selectedOptions =
                question.options?.filter((option) =>
                  valuesArray.includes(String(option.value))
                ) || []

              return (
                <MultipleChoiceQuestion
                  questionId={question.id}
                  label={question.title}
                  options={question.options || []}
                  onChange={(e) => {
                    const newValues = e.map((value) => value.value)
                    onChange(newValues)
                    onFormChange()
                  }}
                  values={selectedOptions}
                  mandatory={question.questionConfig?.mandatory}
                />
              )
            }}
          />
        )
      default:
        return (
          <div>
            Question with type ${question.userQuestionType} is not supported.
          </div>
        )
    }
  }

  return <div className="flex flex-grow flex-col">{renderQuestion()}</div>
}

const Form: FC<{ form: Form }> = (form) => {
  const [isLoading, setIsLoading] = useState(true)

  const { getValues, control } = UseReactHookForm({
    defaultValues: getInitialValues(form.form.questions),
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

  const init = async () => {
    await updateQuestionVisibility()
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Deciding which questions to show..." />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {form.form.title}
      </h1>
      <div className="flex flex-col space-y-8">
        {visibleQuestions.map((visibleQuestion) => (
          <div key={visibleQuestion.id}>
            <FormQuestion
              question={visibleQuestion}
              control={control}
              onFormChange={handleFormChange}
            />
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Button
          onClick={() => {
            alert(
              'Mock submit form response. Check the console for the payload.'
            )
            console.log({
              input: {
                activity_id: '{{FORM_ACTIVITY_ID}}',
                response: convertToAwellInput(getValues()),
              },
            })
          }}
          fullWidth={true}
        >
          Submit form
        </Button>
      </div>
    </div>
  )
}

export default function FormPage() {
  const { form, loading } = useForm('SLcvEi5Sxv7L')

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
