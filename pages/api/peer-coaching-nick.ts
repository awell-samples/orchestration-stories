import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type StartHostedPathwaySessionPayload } from '@/types/generated/api.types'

const API_URL = process.env.GRAPHQL_API_URL || ''
const API_KEY = process.env.GRAPHQL_API_KEY_NICKS_API_TENANT || ''
const PATHWAY_DEFINITION_ID = '-Isaoho04OBY'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
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
            success_url: `https://i.pinimg.com/736x/da/23/8d/da238dc3a982fa7dfa89055279f8fe96.jpg`,
            cancel_url: `https://i.pinimg.com/originals/96/ae/3e/96ae3ee5ae28fa2120569c56cb3dd183.jpg`,
          },
        },
      })

      const session = await fetch(API_URL, {
        method: 'POST',
        headers: {
          apiKey: API_KEY,
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
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
