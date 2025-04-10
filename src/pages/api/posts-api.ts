// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  posts: any[];
  totalPosts: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //lấy dữ liệu form từ wordpress
  const type = req?.query?.type || "";
  const page = req?.query?.page || "";
  const per_page = req?.query?.perpage || 8;
  const api_url = process.env.API_URL || "";
  const hasSSL = process.env.NEXT_PUBLIC_HAS_SSL || "true";

  if (hasSSL === "false") process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  let posts: any[] = [];
  let totalPosts: string = "0";

  try {
    const idNew = 1;
    const idNotifi = 1;
    const id = type === "news" ? idNew : type === "notifis" ? idNotifi : null;
    const endPoint = id
      ? `${api_url}/posts?_embed&per_page=${per_page}&status=publish&page=${page}&categories=${id}`
      : `${api_url}/posts?_embed&per_page=8&status=publish&page=${page}`;

    const res = await fetch(endPoint, { next: { revalidate: 3600 } });
    totalPosts = String(res.headers?.get("X-WP-Total") || "0");

    const postsNotFeatureImage: any[] = (await res?.json()) || [];
    posts =
      postsNotFeatureImage?.length > 0
        ? postsNotFeatureImage?.map((post: any) => {
            const featured_image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return {
              ...post,
              featured_image,
            };
          })
        : [];
  } catch (error) {
    console.log(error);
  }

  if (req.method === "GET") {
    res.status(200).json({
      posts,
      totalPosts,
    });
  }
}
