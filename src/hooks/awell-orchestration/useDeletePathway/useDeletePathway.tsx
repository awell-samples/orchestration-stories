import { useMutation } from '@apollo/client'

import { type EmptyPayload } from '../../../types/generated/api.types'
import { DELETE_PATHWAY } from './graphql/deletePathway.graphql'

interface useDeletePathwayHook {
  deletePathway: (pathwayId: string) => Promise<EmptyPayload>
}

export const useDeletePathway = (): useDeletePathwayHook => {
  const [deletePathwayMutation] = useMutation(DELETE_PATHWAY)

  const deletePathway = async (pathwayId: string) => {
    try {
      const { data } = await deletePathwayMutation({
        variables: {
          input: {
            pathway_id: pathwayId,
          },
        },
        refetchQueries: ['GetPatientPathways'],
      })
      return data.deletePathway.success
    } catch (err) {
      console.log(err)
    }
  }

  return { deletePathway }
}
