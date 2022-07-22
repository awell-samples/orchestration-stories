import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type Story } from '@/types/stories.types'

import { stories } from '../../../src/config/stories'

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  req: NextApiRequest,
  res: NextApiResponse<Story | { error: string }>
) => {
  const { pid } = req.query
  const story = stories.find((story) => story.id === pid)

  if (story) {
    res.status(200).json(story)
  }

  if (story) {
    res.status(404).json({ error: `No story found with id ${pid}` })
  }
}
