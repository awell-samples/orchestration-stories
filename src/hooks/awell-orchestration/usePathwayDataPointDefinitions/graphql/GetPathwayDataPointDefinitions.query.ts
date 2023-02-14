import { gql } from '@apollo/client'

export const GET_PATHWAY_DATA_POINT_DEFINITIONS = gql`
  query GetPathwayDataPointDefinitions(
    $release_id: String!
    $category: [String!]
    $value_type: [String!]
  ) {
    pathwayDataPointDefinitions(
      filters: { category: { in: $category }, value_type: { in: $value_type } }
      release_id: $release_id
    ) {
      data_point_definitions {
        id
        title
        key
        category
        valueType
        possibleValues {
          value
          label
        }
        range {
          min
          max
        }
        unit
        optional
        pii
        metadata {
          value
          key
        }
      }
    }
  }
`
