import { useEffect, useState } from 'react'

import {
  PublishedPathwayDefinition,
  PublishedPathwayDefinitionsPayload,
} from '@/types/generated/api.types'

interface UsePublishedPathwayDefinitionsHook {
  loading: boolean
  data: Array<PublishedPathwayDefinition> | []
}

export const usePublishedPathwayDefinitions = ({
  apiKey,
  environment,
}: {
  apiKey: string
  environment: string
}): UsePublishedPathwayDefinitionsHook => {
  const [data, setData] = useState<PublishedPathwayDefinition[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const data = await fetch(
      '/api/create-hosted-pages/get-published-pathway-definitions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          environment,
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => response.data as PublishedPathwayDefinitionsPayload)

    setData(data.publishedPathwayDefinitions)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
