import { useMutation } from '@apollo/client'

import {
  type CreatePatientInput,
  type User,
} from '../../../types/generated/api.types'
import { CREATE_PATIENT } from './graphql/CreatePatient.graphql'

interface UseCreatePatientHook {
  createPatient: (profileData: CreatePatientInput) => Promise<User>
}

export const useCreatePatient = (): UseCreatePatientHook => {
  const [createPatientMutation] = useMutation(CREATE_PATIENT)

  const createPatient = async (profileData: unknown) => {
    try {
      const { data } = await createPatientMutation({
        variables: {
          input: profileData,
        },
      })
      return data.createPatient.patient
    } catch (error) {
      console.log(error)
    }
    return undefined
  }

  return {
    createPatient,
  }
}
