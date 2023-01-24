import type { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { apiKey, environment } = req.body

      let AWELL_API_ENDPOINT = ''

      switch (environment) {
        case 'sandbox':
          AWELL_API_ENDPOINT =
            'https://api.sandbox.awellhealth.com/orchestration/m2m/graphql'
          break
        case 'production':
          AWELL_API_ENDPOINT =
            'https://api.awellhealth.com/orchestration/m2m/graphql'
          break
        case 'production_us':
          AWELL_API_ENDPOINT =
            'https://api.us.awellhealth.com/orchestration/m2m/graphql'
          break
        default:
          break
      }

      const body = JSON.stringify({
        query: `
        query GetPublishedPathwayDefinitions {
            publishedPathwayDefinitions {
                publishedPathwayDefinitions {
                    id
                }
            }
        }`,
      })

      const success = await fetch(AWELL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
        cache: 'default',
      })
        .then((res) => {
          if (res.ok) {
            return true
          }
          return false
        })
        .catch(() => {
          return false
        })

      res.status(200).send({ success })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
