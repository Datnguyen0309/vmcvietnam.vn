import { fetchAuth } from "@/utils/fetchAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

type Data = {
  categories: Category[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api_url = process.env.API_URL || "";

  try {
    const response = await fetchAuth({
      url: `${api_url}/categories`,
      revalidate: 1,
    });

    const categories = (await response.json()) || [];

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ categories: [] });
  }
}
