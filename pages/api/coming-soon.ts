import type { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const email = req.body?.email || ''
    const storyPath = req.body?.storyPath || ''

    fetch(
      'https://hooks.slack.com/workflows/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',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          storyUrl: `${req.headers.origin}${storyPath}`,
        }),
        cache: 'default',
      }
    )
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((err) => {
        res.status(err.statusCode || 500).json(err.message)
      })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
