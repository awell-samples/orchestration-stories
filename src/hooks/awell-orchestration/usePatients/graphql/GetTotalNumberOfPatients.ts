import { gql } from '@apollo/client'

export const GET_PATIENTS = gql`
  query GetPatients(
    $patient_code: String
    $national_registry_number: String
    $profile_id: [String!]
    $count: Float!
    $offset: Float!
    $sort_field: String!
    $sort_direction: String!
  ) {
    patients(
      filters: {
        patient_code: { eq: $patient_code }
        national_registry_number: { eq: $national_registry_number }
        profile_id: { in: $profile_id }
      }
      pagination: { count: $count, offset: $offset }
      sorting: { field: $sort_field, direction: $sort_direction }
    ) {
      pagination {
        offset
        count
        total_count
      }
      sorting {
        field
        direction
      }
      patients {
        id
        profile {
          email
          sex
          birth_date
          first_name
          last_name
          name
          phone
          mobile_phone
          preferred_language
          patient_code
          national_registry_number
          address {
            street
            city
            zip
            state
            country
          }
        }
      }
    }
  }
`
