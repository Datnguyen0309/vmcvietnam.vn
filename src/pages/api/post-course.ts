// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  posts: any[];
  totalPosts: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slug = req?.query?.slug || "";
  const api_url = process.env.API_URL || "";

  let posts: any[] = [];
  let totalPosts: string = "0";

  try {
    const endPoint = `https://admin.ome.edu.vn/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;

    const response = await fetch(endPoint, {
      next: { revalidate: 1 },
    });

    if (!response.ok) {
      throw new Error(`Posts fetch failed with status: ${response.statusText}`);
    }

    const postsWithEmbed: any[] = await response.json();

    posts = postsWithEmbed?.map((post: any) => {
      const featured_image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        ...post,
        featured_image,
      };
    }) || [];
  } catch (error) {
    console.log("Fetch posts error:", error);
  }

  res.status(200).json({
    posts,
    totalPosts,
  });
}
