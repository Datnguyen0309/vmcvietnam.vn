"use client";

import { formatDate } from "@/utils/date";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";

// Dynamic import of CardBlogVert component
const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);

export const Same = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const idNew = "97";

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/posts/?type=news&page=${page}&idNew=${idNew}`,
          {
            next: { revalidate: 3 }
          }
        );
        const data: { posts: any[] } = await res.json();
        const { posts } = data;
        posts?.length && setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page, idNew]);

  return (
    <>
      <div className="border-t pt-8">
        <div className="py-8">
          <div className="flex justify-between pb-4">
            <h3 className="text-xl font-semibold">Có thể bạn quan tâm</h3>
            <Link href="/tin-tuc" className="text-red-600 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {posts?.slice(0, 3).map((post: any, index: number) => (
              <div key={index} className="col-span-1">
                <CardBlogVert
                  date={post?.date ? formatDate(post.date) : ""}
                  key={index}
                  title={clean(post?.title?.rendered)}
                  desc={clean(post?.excerpt?.rendered)}
                  image={post?.featured_image || ""}
                  path={`/${post?.slug}`}
                  showFooter={true}
                />
              </div>
            ))}
          </div>

          {posts?.length === 0 && (
            <div className="grid place-items-center h-40">
              Dữ liệu đang được chúng tôi cập nhập
            </div>
          )}
        </div>
      </div>
    </>
  );
};
