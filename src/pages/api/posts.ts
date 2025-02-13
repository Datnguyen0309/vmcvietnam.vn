// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchAuth } from "@/utils/fetchAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  posts: any[];
  totalPosts: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ posts: [], totalPosts: "0" });
  }

  const page = Number(req.query.page || 1);
  const api_url = process.env.API_URL || "";

  let posts: any[] = [];
  let totalPosts: string = "0";

  try {
    const endPoint = `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}`;
    const response = await fetchAuth({ url: endPoint, revalidate: 1 });

    const totalPostCount = Number(response.headers?.get("X-WP-Total") || "0");
    totalPosts = totalPostCount > 5 ? String(totalPostCount - 5) : String(totalPostCount);

    const allPosts: any[] = (await response?.json()) || [];

    const excludedSlugs = ["lich-khai-giang", "form-main", "form-poup", "gioi-thieu", "cta"];
    
    const excludedCategoryId = 7; 
    posts = allPosts
      .filter((post) => 
        !excludedSlugs.includes(post.slug) &&
        !post.categories.includes(excludedCategoryId) 
      )
      .map((post) => ({
        ...post,
        featured_image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      }));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  res.status(200).json({ posts, totalPosts });
}
