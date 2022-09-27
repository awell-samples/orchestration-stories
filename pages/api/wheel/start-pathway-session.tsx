import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type StartHostedPathwaySessionPayload } from '@/types/generated/api.types'

const AWELL_API_ENDPOINT =
  'https://api.awellhealth.com/orchestration/m2m/graphql'
const PATHWAY_DEFINITION_ID = '0Z223Up1v6bR' // Migraine intake
const WHEEL_API_KEY = 'LfbozO0FY51Yy6PYI8UpFcxBQxgQ1YW9'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
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
            pathway_definition_id: PATHWAY_DEFINITION_ID,
            success_url: `${req.headers.origin}/demos/wheel/?success=true`,
            cancel_url: `${req.headers.origin}/demos/wheel/?canceled=true`,
          },
        },
      })

      const session = await fetch(AWELL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          apiKey: WHEEL_API_KEY,
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
