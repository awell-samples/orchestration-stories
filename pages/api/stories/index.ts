import type { NextApiRequest, NextApiResponse } from 'next/types'

import { type Stories } from '@/types/stories.types'

import { stories } from '../../../src/config/stories'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<Stories>) => {
  res.status(200).json(stories)
}
