import { useQuery } from '@apollo/client'

import { type Pathway } from '../../../types/generated/api.types'
import { GET_PATHWAY } from './graphql/getPathway.graphql'

interface UsePathwayHook {
  loading: boolean
  pathway: Pathway | null
}

export const usePathway = (pathwayId: string): UsePathwayHook => {
  const { data, loading, error } = useQuery(GET_PATHWAY, {
    variables: {
      pathway_id: pathwayId,
    },
  })

  if (error) {
    console.log(error)
  }

  return {
    loading,
    pathway: data?.pathway || null,
  }
}
