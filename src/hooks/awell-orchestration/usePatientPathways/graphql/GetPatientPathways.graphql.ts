import { gql } from '@apollo/client'

export const GET_PATIENT_PATHWAYS = gql`
  query GetPatientPathways($patient_id: String!, $status: [String!]) {
    patientPathways(
      patient_id: $patient_id
      filters: { status: { in: $status } }
    ) {
      patientPathways {
        id
        title
        pathway_definition_id
        status
        status_explanation
        version
        release_id
      }
    }
  }
`
