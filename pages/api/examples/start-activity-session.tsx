import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type StartPathwayPayload } from '@/types/generated/api.types'

const AWELL_API_ENDPOINT = process.env.GRAPHQL_API_URL || ''
const AWELL_API_KEY = process.env.GRAPHQL_API_KEY_NICKS_API_TENANT || ''
// Template pathway created in the public tenant on Sandbox
const PATHWAY_DEFINITION_ID = 'aqlAwv8cih-t'
const PATIENT_ID = 'qDHyOo2IpvDGdxbFZ4Ocl'
const EMAIL_DATAPOINT_DEFINITION_ID = 'zpY4LlF29O-E'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const email = req.body?.email

    try {
      // Guard clause checks for email
      // and returns early if they are not found
      if (!email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ message: 'Email is required.' })
      }

      const body = JSON.stringify({
        query: `
        mutation StartPathway($input: StartPathwayInput!) {
          startPathway(input: $input) {
            pathway_id
          }
        }`,
        variables: {
          input: {
            patient_id: PATIENT_ID,
            pathway_definition_id: PATHWAY_DEFINITION_ID,
            data_points: [
              {
                data_point_definition_id: EMAIL_DATAPOINT_DEFINITION_ID,
                value: email,
              },
            ],
          },
        },
      })

      const pathway = await fetch(AWELL_API_ENDPOINT, {
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
        .then((response) => response.data.startPathway as StartPathwayPayload)

      if (pathway) {
        res.status(200).send({
          pathway,
        })
      } else {
        res.status(500).send({ message: 'Something went wrong' })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
