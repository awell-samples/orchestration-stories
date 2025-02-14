import { type FormError } from '@awell-health/ui-library'
// eslint-disable-next-line import/named
import { FieldErrors, FieldValues } from 'react-hook-form'

const getErrorMessage = (errorType: string | number) => {
  if (errorType === 'required') {
    return 'This question is required'
  }

  if (errorType === 'validate') {
    return 'This question is required, select at least one option.'
  }

  return 'No error message defined for this type of error.'
}

export const convertFormErrorsToAwellErrors = (
  formErrors: FieldErrors<FieldValues>
): FormError[] => {
  const formErrorsArray = Object.entries(formErrors).map((e) => ({
    id: e[0],
    error: getErrorMessage(String(e[1]?.type)),
  }))

  return formErrorsArray
}
