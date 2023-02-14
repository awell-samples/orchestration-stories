import { useLazyQuery } from '@apollo/client'

import { type DataPointDefinition } from '../../../types/generated/api.types'
import { GET_PATHWAY_DATA_POINT_DEFINITIONS } from './graphql/GetPathwayDataPointDefinitions.query'

interface GetPathwayDataPointDefinitionsInput {
  releaseId: string
}

interface UsePathwayDataPointDefinitionsHook {
  getPathwayDataPointDefinitions: ({
    releaseId,
  }: GetPathwayDataPointDefinitionsInput) => Promise<Array<DataPointDefinition>>
}

export const usePathwayDataPointDefinitions =
  (): UsePathwayDataPointDefinitionsHook => {
    const [pathwayDataPointDefinitionsQuery] = useLazyQuery(
      GET_PATHWAY_DATA_POINT_DEFINITIONS
    )

    const getPathwayDataPointDefinitions = async ({
      releaseId,
    }: GetPathwayDataPointDefinitionsInput) => {
      try {
        const { data } = await pathwayDataPointDefinitionsQuery({
          variables: {
            release_id: releaseId,
          },
        })
        return data?.pathwayDataPointDefinitions.data_point_definitions || []
      } catch (error) {
        console.log(error)
      }

      return undefined
    }

    return {
      getPathwayDataPointDefinitions,
    }
  }
