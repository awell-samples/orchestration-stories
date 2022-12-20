import { useMutation } from '@apollo/client'

import { type StartHostedActivitySessionPayload } from '../../../types/generated/api.types'
import { START_HOSTED_ACTIVITY_SESSION } from './graphql/startHostedActivitySession.graphql'

type StartHostedActivitySessionInput = {
  stakeholderId: string
  pathwayId: string
  successUrl: string
  cancelUrl: string
}

interface UseStartHostedActivitySessionHook {
  startHostedActivitySession: ({
    stakeholderId,
    pathwayId,
    successUrl,
    cancelUrl,
  }: StartHostedActivitySessionInput) => Promise<StartHostedActivitySessionPayload>
}

export const useStartHostedActivitySession =
  (): UseStartHostedActivitySessionHook => {
    const [startHostedActivitySessionMutation] = useMutation(
      START_HOSTED_ACTIVITY_SESSION
    )

    const startHostedActivitySession = async ({
      stakeholderId,
      pathwayId,
      successUrl,
      cancelUrl,
    }: StartHostedActivitySessionInput) => {
      try {
        const { data } = await startHostedActivitySessionMutation({
          variables: {
            input: {
              stakeholder_id: stakeholderId,
              pathway_id: pathwayId,
              success_url: successUrl,
              cancel_url: cancelUrl,
            },
          },
        })
        return data.startHostedActivitySession
      } catch (err) {
        console.log(err)
      }
    }

    return { startHostedActivitySession }
  }
