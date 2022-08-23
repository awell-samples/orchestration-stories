import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type StartHostedPathwaySessionPayload } from '@/types/generated/api.types'

const AWELL_API_ENDPOINT = process.env.GRAPHQL_API_URL || ''
const AWELL_API_KEY = process.env.GRAPHQL_API_KEY || ''
// Onboarding template pathway created in the public tenant on Sandbox
const PATHWAY_DEFINITION_ID = 'J0oNK2V91RL2'

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
            success_url: `${req.headers.origin}/stories/hosted-pathway?success=true`,
            cancel_url: `${req.headers.origin}/stories/hosted-pathway?canceled=true`,
          },
        },
      })

      const session = await fetch(AWELL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          apiKey: AWELL_API_KEY,
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

      res.redirect(303, session.session_url)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
