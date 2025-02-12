// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchAuth } from "@/utils/fetchAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  samePosts: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //lấy dữ liệu form từ wordpress
  const catId = req?.query?.catId || "";
  const id = req?.query?.id || "";
  const api_url = process.env.API_URL || "";

  let samePosts: any[] = [];
  if (catId) {
    try {
      // Lấy danh sách các bài viết cùng thể loại
      const resRelatedPosts = await fetchAuth({
        url: `${api_url}/posts?categories=${catId}&exclude=${id}&per_page=3&_embed`,
        revalidate: 1
      });
      const relatedPosts: any[] = await resRelatedPosts.json();
      const postsWithFeaturedImages =
        relatedPosts?.length > 0
          ? relatedPosts?.map((relatedPost: any) => {
              const featured_image =
                relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                null;

              return {
                ...relatedPost,
                featured_image
              };
            })
          : [];

      samePosts = postsWithFeaturedImages;
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "GET") {
    res.status(200).json({
      samePosts
    });
  }
}
