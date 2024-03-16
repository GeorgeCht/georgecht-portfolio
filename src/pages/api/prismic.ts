import { createClient } from '@prismicio/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      try {
        const client = createClient('georgecht-portfolio')
        const result = await client.getSingle('footer')

        res.status(200).json(await result)
        res.end()
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized.' })
        res.end()
      }
    } else {
      res.setHeader('Allow', 'GET')
      res.status(403).json({ error: 'Forbidden method.' })
      res.end()
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
    res.end()
  }
}
