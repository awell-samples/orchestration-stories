import { ApolloError, useQuery } from '@apollo/client'

import type { Form } from '../../../types/generated/api.types'
import { GET_FORMS } from './graphql/forms.graphql'

interface UseFormHook {
  loading: boolean
  error?: ApolloError
  forms: Array<Form>
}

export const useForms = (pathwayDefinitionId: string): UseFormHook => {
  const { data, loading, error } = useQuery(GET_FORMS, {
    variables: {
      pathway_definition_id: pathwayDefinitionId,
    },
  })

  if (error) {
    console.log(error)
  }

  return {
    loading,
    error,
    forms: data?.forms.forms,
  }
}
