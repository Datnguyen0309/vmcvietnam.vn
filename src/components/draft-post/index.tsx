"use client";

import { formatDate } from "@/utils/date";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";

const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);
const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);
const BannerPage = dynamic(() =>
  import("@/components/layout/components/BannerPage").then(
    (mod) => mod.BannerPage
  )
);

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  date: string;
  excerpt: {
    rendered: string;
  };
  featured_image: string;
}

export const DraftPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts-draft/?len=${9}`);
        const data: { posts: Post[]; totalPosts: string } = await res.json();
        const { posts } = data;
        posts?.length && setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white">
      <BannerPage
        title="Bài viết chưa xuất bản"
        image="/assets/bannergt.webp"
      />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <div key={post.id} className="p-4">
              <CardBlogVert
                title={clean(post.title.rendered)}
                date={post.date ? formatDate(post.date) : ""}
                desc={clean(post.excerpt.rendered)}
                image={post.featured_image || ""}
                path={`/preview/${post.id}`}
                preview
              />
            </div>
          ))}
        </div>
        {posts?.length === 0 && (
          <div className="container mx-auto py-8">
            <div className="flex items-center justify-center min-h-[50vh]">
              Không có bài viết nào mới xuất bản
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
