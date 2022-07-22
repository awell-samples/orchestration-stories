import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type Story } from '@/types/stories.types'

import { stories } from '../../../src/config/stories'

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  req: NextApiRequest,
  res: NextApiResponse<Story | { error: string }>
) => {
  try {
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
