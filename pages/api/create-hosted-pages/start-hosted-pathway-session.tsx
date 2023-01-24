import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type StartHostedPathwaySessionPayload } from '@/types/generated/api.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { apiKey, environment, pathwayDefinitionId } = req.body

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
        mutation StartHostedPathwaySession(
          $input: StartHostedPathwaySessionInput!,
        ) {
          startHostedPathwaySession(input: $input) {
            session_id
            session_url
            stakeholder {
              type
              name
            }
            pathway_id
          }
        }`,
        variables: {
          input: {
            pathway_definition_id: pathwayDefinitionId,
            success_url: `${req.headers.origin}/my-hosted-pages/success`,
            cancel_url: `${req.headers.origin}/my-hosted-pages/cancel`,
          },
        },
      })

      const session = await fetch(AWELL_API_ENDPOINT, {
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
              .startHostedPathwaySession as StartHostedPathwaySessionPayload
        )

      res.status(200).send({ sessionUrl: session.session_url })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
