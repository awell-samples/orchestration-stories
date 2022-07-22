import { useState } from 'react'

import { useFormActivityContext } from '../../../../../contexts/FormActivityContext'
import {
  type Option,
  type Question,
} from '../../../../../types/generated/api.types'
import { KioskButton } from '../../../../Button/variants'
import { Label } from '../Atoms'

interface MultipleSelectProps {
  question: Question
}

export const MultipleSelect = ({ question }: MultipleSelectProps) => {
  const { goToNextQuestion, appendFormData } = useFormActivityContext()

  const [checkedOptions, setCheckedOptions] = useState<Array<Option>>([])
  const options = question.options || []

  const onQuestionSubmit = async () => {
    // We need an array of values to send to the backend
    const formattedData = checkedOptions.map((item) =>
      JSON.stringify(item.value)
    )
    await appendFormData({ [question.id]: formattedData })
    goToNextQuestion()
  }

  const handleCheck = (option: Option) => {
    let updatedList = [...checkedOptions]
    if (!isChecked(option)) {
      updatedList = [...checkedOptions, option]
    } else {
      updatedList.splice(checkedOptions.indexOf(option), 1)
    }
    setCheckedOptions(updatedList)
  }

  const isChecked = (option: Option) => checkedOptions.includes(option)

  return (
    <>
      <div className="grow flex flex-col">
        <div className="container grow">
          <Label
            htmlFor={question.id}
            label={question.title}
            mandatory={question.questionConfig?.mandatory}
          />
          <div className="my-4">
            <fieldset className="space-y-4">
              {options.map((option) => (
                <div key={option.id} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={option.id}
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={isChecked(option)}
                      onChange={() => handleCheck(option)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={option.id}
                      className="font-medium text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <div className="">
          <KioskButton
            label="Next"
            onClick={() => onQuestionSubmit()}
            color="blue"
            disabled={false}
          />
        </div>
      </div>
    </>
  )
}
