import { useQuery } from '@apollo/client'

import { type User } from '../../../types/generated/api.types'
import { GET_PATIENTS } from './graphql/GetPatients.graphql'

type FetchMoreArgs = {
  offset: number
}

interface UsePatientsHook {
  loading: boolean
  patients: User[]
  fetchMore: ({ variables }: { variables: FetchMoreArgs }) => void
  pagination: {
    offset: number
    count: number
    total_count: number
  }
}

const COUNT = 10

export const usePatients = (): UsePatientsHook => {
  const { data, loading, error, fetchMore } = useQuery(GET_PATIENTS, {
    variables: {
      offset: 0,
      count: COUNT,
      sort_field: 'last_name',
      sort_direction: 'desc',
    },
    // Rerender with loading:true whenever fetchMore is called
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.log(error)
  }

  const offset = data?.patients.pagination.offset || 0
  const total_count = data?.patients.pagination.total_count || 0

  return {
    loading,
    fetchMore,
    pagination: {
      offset,
      count: COUNT,
      total_count,
    },
    patients: data?.patients.patients || [],
  }
}
