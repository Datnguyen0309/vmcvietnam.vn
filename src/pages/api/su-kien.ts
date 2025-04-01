import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const wpUrl = 'http://10.10.51.16:8686/wp-json/wp/v2/su-kien?acf_format=standard'
  
    try {
      const response = await fetch(wpUrl)
      const data = await response.json()
  
      // Giả sử mỗi post có acf.event_sections là mảng
      const eventSections = data.map((post: { acf: { event_sections: any } }) => post.acf?.event_sections).flat()
  
      res.status(200).json({ eventSections })
    } catch (error) {
      console.error('Failed to fetch su-kien:', error)
      res.status(500).json({ error: 'Failed to fetch' })
    }
  }
  