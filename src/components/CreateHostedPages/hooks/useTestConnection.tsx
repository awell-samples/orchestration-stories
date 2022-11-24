interface UseTestConnectionHook {
  testConnection: ({
    apiKey,
    environment,
  }: {
    apiKey: string
    environment: string
  }) => Promise<boolean>
}

export const useTestConnection = (): UseTestConnectionHook => {
  const testConnection = async ({
    apiKey,
    environment,
  }: {
    apiKey: string
    environment: string
  }) => {
    const success = await fetch('/api/create-hosted-pages/test-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        environment,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const resJson = await res.json()
          return resJson?.success || false
        }
        return false
      })
      .catch(() => {
        return false
      })

    return success
  }

  return {
    testConnection,
  }
}
