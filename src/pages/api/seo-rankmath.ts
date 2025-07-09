import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query
  const RANKMATH_URL = process.env.API_RMS_URL

  try {
    const response = await fetch(`${RANKMATH_URL}/${slug}`)
    const data = await response.json()
    res.status(200).json({ head: data?.head || null })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RankMath SEO" })
  }
}
