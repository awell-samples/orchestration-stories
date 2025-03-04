import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const API_URL = process.env.AWELL_API_URL
const API_KEY = process.env.AWELL_API_KEY || ''

const proxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxy.web(req, res, {
    target: API_URL,
    changeOrigin: true,
    headers: {
      apiKey: API_KEY,
    },
  })
}
