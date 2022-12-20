import { gql } from '@apollo/client'

export const START_HOSTED_ACTIVITY_SESSION = gql`
  mutation StartHostedActivitySession(
    $input: StartHostedActivitySessionInput!
  ) {
    startHostedActivitySession(input: $input) {
      session_id
      session_url
    }
  }
`
