import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'http://10.10.51.16:8686//wp-json/wp/v2/posts';

export type Post = {
  slug: any;
  featured_image: any;
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded: {
    'wp:featuredmedia': [{ source_url: string }];
    'wp:term': Array<Array<{ id: number; name: string; taxonomy: string }>>;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let posts: any[] = [];
  let totalPosts = 0;

  try {
    const categoryId = req.query.categoryId ? `&categories=${req.query.categoryId}` : '';
    const page = req.query.page ? parseInt(req.query.page as string) : 1; // Default to page 1
    const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 8; // Default to 8 posts per page

    const response = await fetch(`${API_URL}?_embed${categoryId}&page=${page}&per_page=${perPage}`);
    const postsNotFeatureImage: any[] = await response.json();
    totalPosts = parseInt(response.headers.get('X-WP-Total') || '0'); // Get total posts from response headers

    const excludeCategoryIds = [7, 8, 9];

    posts = postsNotFeatureImage.length > 0
      ? postsNotFeatureImage
          .filter((post: any) => !post.categories.some((catId: number) => excludeCategoryIds.includes(catId)))
          .map((post: any) => {
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
