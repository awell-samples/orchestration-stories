import type { NextApiRequest, NextApiResponse } from 'next/types'

import { PublishedPathwayDefinitionsPayload } from '@/types/generated/api.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { apiKey, environment } = req.body

      const AWELL_API_ENDPOINT =
        environment === 'sandbox'
          ? 'https://api.sandbox.awellhealth.com/orchestration/m2m/graphql'
          : 'https://api.awellhealth.com/orchestration/m2m/graphql'

      const body = JSON.stringify({
        query: `
        query GetPublishedPathwayDefinitions {
            publishedPathwayDefinitions {
                publishedPathwayDefinitions {
                    id
                    title
                    version
                    dataPointDefinitions {
                      id
                      key
                    }
                }
            }
        }`,
      })

      const data = await fetch(AWELL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
        cache: 'default',
      })
        .then((response) => response.json())
        .then(
          (response) =>
            response.data
              .publishedPathwayDefinitions as PublishedPathwayDefinitionsPayload
        )

      res.status(200).send({ data })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
