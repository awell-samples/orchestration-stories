import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type Story } from '@/types/stories.types'

import { stories } from '../../../src/config/stories'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: '*',
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: NextApiRequest,
  res: NextApiResponse<Story | { error: string }>
) => {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors)

    const { pid } = req.query
    const story = stories.find((story) => story.id === pid)

    if (story !== undefined) {
      res.status(200).json(story)
    } else {
      res.status(404).json({ error: `No story found with id ${pid}` })
    }
  } catch (err) {
    //@ts-expect-error not sure how to type
    res.status(500).json({ error: err?.message })
  }
}
