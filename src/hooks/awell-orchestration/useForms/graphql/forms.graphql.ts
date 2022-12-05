import { gql } from '@apollo/client'

export const GET_FORMS = gql`
  query GetFormsForPublishedPathway(
    $pathway_definition_id: String!
    $release_id: String
  ) {
    forms(
      pathway_definition_id: $pathway_definition_id
      release_id: $release_id
    ) {
      forms {
        id
        title
        questions {
          id
          title
          dataPointValueType
          options {
            id
            value
            label
          }
          questionType
          userQuestionType
          questionConfig {
            recode_enabled
            mandatory
            slider {
              min
              max
              step_value
              display_marks
              min_label
              max_label
              is_value_tooltip_on
              show_min_max_values
            }
          }
        }
      }
    }
  }
`
