import { type ApolloQueryResult } from '@apollo/client'

import { type User } from '../../../types/generated/api.types'
// import { GET_PATIENTS } from './graphql/GetPatients.graphql'

type FetchMoreArgs = {
  offset: number
}

interface UsePatientsHook {
  loading: boolean
  patients: User[]
  fetchMore: ({ variables }: { variables: FetchMoreArgs }) => void
  refetchPatients: (
    variables?:
      | Partial<{
          offset: number
          count: number
          sort_field: string
          sort_direction: string
          search: string
        }>
      | undefined
  ) => Promise<ApolloQueryResult<unknown>>
  pagination: {
    offset: number
    count: number
    total_count: number
  }
}

const COUNT = 10

export const usePatients = (): UsePatientsHook => {
  // const {
  //   data,
  //   loading,
  //   error,
  //   fetchMore,
  //   refetch: refetchPatients,
  // } = useQuery(GET_PATIENTS, {
  //   variables: {
  //     offset: 0,
  //     count: COUNT,
  //     sort_field: 'last_name',
  //     sort_direction: 'desc',
  //   },
  //   // Rerender with loading:true whenever fetchMore is called
  //   notifyOnNetworkStatusChange: true,
  // })

  // if (error) {
  //   console.log(error)
  // }

  // const offset = data?.patients.pagination.offset || 0
  // const total_count = data?.patients.pagination.total_count || 0

  return {
    loading: false,
    fetchMore: () => true,
    refetchPatients: () =>
      Promise.resolve({ data: {}, loading: false, networkStatus: 7 }),
    pagination: {
      offset: 0,
      count: COUNT,
      total_count: 0,
    },
    // patients: data?.patients.patients || [],
    // !IMPORTANT: see https://awellhealth.slack.com/archives/CV1UCBUHF/p1739560148094269
    patients: [],
  }
}
