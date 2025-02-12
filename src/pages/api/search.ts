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
  //lấy dữ liệu form từ wordpress
  const searchtext = req?.query?.search || "";
  const page = req?.query?.page || "";
  const per_page = req?.query?.per_page || 12;
  const api_url = process.env.API_URL || "";
  let posts: any[] = [];
  let totalPosts: string = "0";
  try {
    const endPoint = `${api_url}/posts?search=${searchtext}&_embed&per_page=${per_page}&status=publish&page=${page}`;
    const res = await fetchAuth({ url: endPoint, revalidate: 1 });
    totalPosts = String(res.headers?.get("X-WP-Total") || "0");
    const postsNotFeatureImage: any[] = (await res?.json()) || [];
    const filteredPosts = postsNotFeatureImage.filter((post) => {
      const slug = post.slug || "";

      const excludedSlugs = [
        "lich-khai-giang",
        "form-main",
        "form-poup",
        "gioi-thieu",
        "cta"
      ];

      return !excludedSlugs.includes(slug);
    });
    posts =
      filteredPosts?.length > 0
        ? filteredPosts?.map((post: any) => {
            const featured_image =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return {
              ...post,
              featured_image
            };
          })
        : [];
  } catch (error) {
    console.log(error);
  }

  if (req.method === "GET") {
    res.status(200).json({
      posts,
      totalPosts
    });
  }
}
