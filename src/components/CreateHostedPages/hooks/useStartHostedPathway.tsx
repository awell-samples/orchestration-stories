import { DataPointInput } from '@/types/generated/api.types'

type StartHostedPathwayFunction = ({
  apiKey,
  environment,
  pathwayDefinitionId,
  baselineDataPoints,
}: {
  apiKey: string
  environment: string
  pathwayDefinitionId: string
  baselineDataPoints: Array<DataPointInput>
}) => Promise<{ sessionUrl: string | null; pathwayId?: string | null }>

interface UseStartHostedPathway {
  startHostedPathway: StartHostedPathwayFunction
}

export const useStartHostedPathway = (): UseStartHostedPathway => {
  const startHostedPathway: StartHostedPathwayFunction = async ({
    apiKey,
    environment,
    pathwayDefinitionId,
    baselineDataPoints,
  }) => {
    const success = await fetch(
      '/api/create-hosted-pages/start-hosted-pathway-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          environment,
          pathwayDefinitionId,
          baselineDataPoints,
        }),
      }
    )
      .then(async (res) => {
        if (res.ok) {
          const resJson = await res.json()
          return {
            sessionUrl: resJson?.sessionUrl,
            pathwayId: resJson?.pathwayId,
          }
        }
        return {
          sessionUrl: null,
          pathwayId: null,
        }
      })
      .catch(() => {
        return {
          sessionUrl: null,
          pathwayId: null,
        }
      })

    return success
  }

  return {
    startHostedPathway,
  }
}
