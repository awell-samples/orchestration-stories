import { useMutation } from '@apollo/client'

import { type EmptyPayload } from '../../../types/generated/api.types'
import { DELETE_PATIENT } from './graphql/deletePatient.graphql'

interface useDeletePatientHook {
  deletePatient: (patientId: string) => Promise<EmptyPayload>
}

export const useDeletePatient = (): useDeletePatientHook => {
  const [deletePatientMutation] = useMutation(DELETE_PATIENT)

  const deletePatient = async (patientId: string) => {
    try {
      const { data } = await deletePatientMutation({
        variables: {
          input: {
            patient_id: patientId,
          },
        },
        refetchQueries: ['GetPatient'],
      })
      return data.deletePatient.success
    } catch (err) {
      console.log(err)
    }
  }

  return { deletePatient }
}
