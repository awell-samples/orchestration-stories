import { gql } from '@apollo/client'

export const SEARCH_BY_NATIONAL_REGISTRY_NUMBER = gql`
  query SearchPatientsByNationalRegistryNumber(
    $national_registry_number: String!
  ) {
    searchPatientsByNationalRegistryNumber(
      national_registry_number: $national_registry_number
    ) {
      patients {
        id
        profile {
          name
          birth_date
          patient_code
          preferred_language
          email
          sex
          national_registry_number
          mobile_phone
        }
      }
    }
  }
`
