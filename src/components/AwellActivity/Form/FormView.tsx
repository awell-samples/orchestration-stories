import { Form, Question } from '@/types/generated/api.types'

import {
  Boolean,
  DateComponent,
  DescriptionComponent,
  LongText,
  MultipleSelect,
  NumberComponent,
  ShortText,
  SingleSelect,
  Slider,
} from './QuestionTypes'

interface FormViewProps {
  form: Form
  debug?: boolean
}

const Question = ({ question }: { question: Question }) => {
  const renderQuestion = () => {
    switch (question.userQuestionType) {
      case 'NUMBER':
        return <NumberComponent question={question} />
      case 'LONG_TEXT':
        return <LongText question={question} />
      case 'DATE':
        return <DateComponent question={question} />
      case 'MULTIPLE_CHOICE':
        return <SingleSelect question={question} />
      case 'YES_NO':
        return <Boolean question={question} />
      case 'SHORT_TEXT':
        return <ShortText question={question} />
      case 'SLIDER':
        return <Slider question={question} />
      case 'DESCRIPTION':
        return <DescriptionComponent question={question} />
      case 'MULTIPLE_SELECT':
        return <MultipleSelect question={question} />
      default:
        return (
          <div>
            Question with type ${question.userQuestionType} is not supported.
          </div>
        )
    }
  }

  return renderQuestion()
}

export const FormView = ({ form, debug = true }: FormViewProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {form.title}
      </h1>
      <div className="flex flex-col space-y-8">
        {form.questions.map((question) => (
          <div key={question.id}>
            {debug && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {question.id}
              </span>
            )}
            <Question question={question} key={question.id} />
            {debug && (
              <pre className="mt-2 text-xs">
                {JSON.stringify(question.rule, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
