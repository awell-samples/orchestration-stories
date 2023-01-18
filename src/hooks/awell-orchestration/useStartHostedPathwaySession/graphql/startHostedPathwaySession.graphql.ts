import { gql } from '@apollo/client'

export const START_HOSTED_PATHWAY_SESSION = gql`
  mutation StartHostedPathwaySession($input: StartHostedPathwaySessionInput!) {
    startHostedPathwaySession(input: $input) {
      session_id
      session_url
      pathway_id
      stakeholder {
        id
        type
        name
      }
    }
  }
`
