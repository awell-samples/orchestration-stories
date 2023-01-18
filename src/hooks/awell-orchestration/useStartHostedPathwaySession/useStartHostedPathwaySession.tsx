import { useMutation } from '@apollo/client'

import { type StartHostedPathwaySessionPayload } from '../../../types/generated/api.types'
import { START_HOSTED_PATHWAY_SESSION } from './graphql/startHostedPathwaySession.graphql'

type StartHostedPathwaySessionInput = {
  pathwayDefinitionId: string
  patientId: string
  successUrl: string
  cancelUrl: string
}

interface UseStartHostedPathwaySessionHook {
  startHostedPathwaySession: ({
    pathwayDefinitionId,
    patientId,
    successUrl,
    cancelUrl,
  }: StartHostedPathwaySessionInput) => Promise<StartHostedPathwaySessionPayload>
}

export const useStartHostedPathwaySession =
  (): UseStartHostedPathwaySessionHook => {
    const [startHostedPathwaySessionMutation] = useMutation(
      START_HOSTED_PATHWAY_SESSION
    )

    const startHostedPathwaySession = async ({
      pathwayDefinitionId,
      patientId,
      successUrl,
      cancelUrl,
    }: StartHostedPathwaySessionInput) => {
      try {
        const { data } = await startHostedPathwaySessionMutation({
          variables: {
            input: {
              pathway_definition_id: pathwayDefinitionId,
              patient_id: patientId,
              success_url: successUrl,
              cancel_url: cancelUrl,
            },
          },
        })
        return data.startHostedPathwaySession
      } catch (err) {
        console.log(err)
      }
    }

    return { startHostedPathwaySession }
  }
