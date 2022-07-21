import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useEvaluateFormRules } from '../../hooks/awell-orchestration/useEvaluateFormRules'
import { useSubmitFormResponse } from '../../hooks/awell-orchestration/useSubmitFormResponse'
import { AnswerValue, QuestionWithVisibility } from '../../types/form.types'
import { type Activity, type Question } from '../../types/generated/api.types'
import { keyValueObjectToQuestionResponseObject } from '../../utils/dataPoints/keyValueObjectToQuestionResponseObject'
import { getInitialValues, updateVisibility } from '../../utils/form'

interface FormActivityContextStateType {
  currentQuestion: number
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  formData: Record<string, AnswerValue>
  appendFormData: (newValues: {
    [key in string]: AnswerValue
  }) => void
  visibleQuestions: Array<QuestionWithVisibility>
  reset: () => void
  isLoadingQuestions: boolean
  areAllQuestionsCompleted: boolean
  isSubmittingForm: boolean
  isFormSubmitted: boolean
  submitForm: () => void
}

const initialState: FormActivityContextStateType = {
  currentQuestion: 0,
  goToNextQuestion: () => null,
  goToPreviousQuestion: () => null,
  formData: {},
  appendFormData: () => null,
  visibleQuestions: [],
  reset: () => null,
  isLoadingQuestions: false,
  areAllQuestionsCompleted: false,
  isSubmittingForm: false,
  isFormSubmitted: false,
  submitForm: () => null,
}

export const FormActivityContext =
  createContext<FormActivityContextStateType>(initialState)

interface FormActivityProviderProps {
  formActivity: Activity
  questions: Array<Question>
  children: ReactNode
}

export const FormActivityProvider = ({
  formActivity,
  questions,
  children,
}: FormActivityProviderProps) => {
  const [data, setData] = useState(initialState.formData)
  const [currentQuestion, setCurrentQuestion] = useState(
    initialState.currentQuestion
  )
  const [visibleQuestions, setVisibleQuestions] = useState(
    initialState.visibleQuestions
  )
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(
    initialState.isLoadingQuestions
  )
  const [areAllQuestionsCompleted, setAreAllQuestionsCompleted] = useState(
    initialState.areAllQuestionsCompleted
  )
  const [isSubmittingForm, setIsSubmittingForm] = useState(
    initialState.isSubmittingForm
  )
  const [isFormSubmitted, setIsFormSubmitted] = useState(
    initialState.isFormSubmitted
  )
  const [evaluateFormRules] = useEvaluateFormRules(formActivity.id)
  const { submitFormResponse } = useSubmitFormResponse()

  const goToNextQuestion = () => {
    const currentQuestionWasLastQuestion =
      currentQuestion === visibleQuestions.length - 1
    if (currentQuestionWasLastQuestion) {
      setAreAllQuestionsCompleted(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1)
  }

  const reset = () => {
    setData({})
  }

  const submitForm = async () => {
    const formattedData = keyValueObjectToQuestionResponseObject(data)
    setIsSubmittingForm(true)
    /**
     * We only want to submit data for the applicable/visible questions
     */
    const responseOfVisibleQuestionsOnly = formattedData.filter(
      (questionData) =>
        visibleQuestions.find(
          (question) => question.id === questionData.question_id
        )
          ? true
          : false
    )

    const submittedForm = await submitFormResponse({
      activityId: formActivity.id,
      response: responseOfVisibleQuestionsOnly,
    })

    if (submittedForm.status === 'DONE') {
      setIsFormSubmitted(true)
    }
  }

  const appendFormData = (newValues: {
    [key in string]: AnswerValue
  }) => {
    setData(() => {
      return { ...data, ...newValues }
    })
  }

  const updateVisibleQuestions = async () => {
    setIsLoadingQuestions(true)
    const formattedData = keyValueObjectToQuestionResponseObject(data)
    const evaluationResults = await evaluateFormRules(formattedData)
    setVisibleQuestions(updateVisibility(questions, evaluationResults))
    setIsLoadingQuestions(false)
  }

  /**
   * On initial load, populate questions with default values
   * and get visible questions
   */
  useEffect(() => {
    const fetchInitialVisibileQuestions = async () => {
      setIsLoadingQuestions(true)
      const defaultValues = keyValueObjectToQuestionResponseObject(
        getInitialValues(questions)
      )
      const evaluationResults = await evaluateFormRules(defaultValues)
      setVisibleQuestions(updateVisibility(questions, evaluationResults))
      setIsLoadingQuestions(false)
    }

    fetchInitialVisibileQuestions()
  }, [])

  /**
   * Every time the data changes,
   * we update visibility on the questions
   */
  useEffect(() => {
    updateVisibleQuestions
  }, [data])

  return (
    <FormActivityContext.Provider
      value={{
        currentQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
        formData: data,
        appendFormData,
        reset,
        visibleQuestions,
        isLoadingQuestions,
        areAllQuestionsCompleted,
        isSubmittingForm,
        isFormSubmitted,
        submitForm,
      }}
    >
      {children}
    </FormActivityContext.Provider>
  )
}

export const useFormActivityContext = () => useContext(FormActivityContext)
