import {
  type LazyQueryResult,
  type QueryLazyOptions,
  useLazyQuery,
} from '@apollo/client'

import { User } from '../../../types/generated/api.types'
import { SEARCH_BY_NATIONAL_REGISTRY_NUMBER } from './graphql/searchByNationalRegistryNumber.graphql'

type searchVariables = {
  national_registry_number: string
}

interface UseSearchByNationalRegistryNumberHook {
  loading: boolean
  called: boolean
  searchByNationalRegistryNumber: (
    options?: QueryLazyOptions<searchVariables> | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<LazyQueryResult<any, searchVariables>>
  results: User[]
}

export const useSearchByNationalRegistryNumber =
  (): UseSearchByNationalRegistryNumberHook => {
    const [searchByNationalRegistryNumber, { called, loading, error, data }] =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useLazyQuery<any, searchVariables>(SEARCH_BY_NATIONAL_REGISTRY_NUMBER)

    if (error) {
      console.log(error)
    }

    return {
      loading,
      called,
      searchByNationalRegistryNumber,
      results: data?.searchPatientsByNationalRegistryNumber?.patients || [],
    }
  }
