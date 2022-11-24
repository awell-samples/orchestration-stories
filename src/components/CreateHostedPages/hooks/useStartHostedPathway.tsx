interface UseStartHostedPathway {
  startHostedPathway: ({
    apiKey,
    environment,
    pathwayDefinitionId,
  }: {
    apiKey: string
    environment: string
    pathwayDefinitionId: string
  }) => Promise<string>
}

export const useStartHostedPathway = (): UseStartHostedPathway => {
  const startHostedPathway = async ({
    apiKey,
    environment,
    pathwayDefinitionId,
  }: {
    apiKey: string
    environment: string
    pathwayDefinitionId: string
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
        }),
      }
    )
      .then(async (res) => {
        if (res.ok) {
          const resJson = await res.json()
          return resJson?.sessionUrl || false
        }
        return false
      })
      .catch(() => {
        return false
      })

    return success
  }

  return {
    startHostedPathway,
  }
}
