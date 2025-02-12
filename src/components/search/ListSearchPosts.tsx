"use client";

import { Loading } from "@/components/Loading";
import { formatDate } from "@/utils/date";
import { toSlug } from "@/utils/toSlug";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { clean } from "../lib/sanitizeHtml";

const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);

export interface TypePost {
  title: {
    rendered: string;
  };
  date: string;
  excerpt: {
    rendered: string;
  };
  featured_image: string;
  slug: string;
  categories?: number[];
  content?: {
    rendered: string;
  };
  id?: number;
}

export const ListSearchPosts = ({
  handleRouter
}: {
  handleRouter?: ({
    // eslint-disable-next-line no-unused-vars
    selected,
    // eslint-disable-next-line no-unused-vars
    searchText
  }: {
    selected: number;
    searchText: string;
  }) => void;
}) => {
  const router = useRouter();

  const [posts, setPosts] = useState<TypePost[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [resetpagi, setResetpagi] = useState(false);
  const len = Math.ceil(Number(totalPosts) / 12);

  useEffect(() => {
    setResetpagi(true);
  }, [router.query.page]);

  useEffect(() => {
    const { keyword, page } = router.query;
    let keywords = Array.isArray(keyword)
      ? keyword[0] || ""
      : (keyword as string) || "";
    var pages = Number(
      Array.isArray(page) ? page[0] || "" : (page as string) || ""
    );

    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search/?page=${pages}&search=${toSlug({
            type: "signed",
            input: keywords
          })}`,
          {
            next: { revalidate: 3 }
          }
        );

        const data: { posts: TypePost[]; totalPosts: string } =
          await res.json();
        const { posts, totalPosts } = data;
        totalPosts && setTotalPosts(totalPosts);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      setResetpagi(false);
    };
    getPosts();
  }, [router.query]);

  return (
    <>
      <div>
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts?.map((post: TypePost, index: number) => (
                <div key={index}>
                  <CardBlogVert
                    title={clean(post?.title?.rendered)}
                    date={post?.date ? formatDate(post.date) : ""}
                    desc={clean(post?.excerpt?.rendered)}
                    image={post?.featured_image || ""}
                    path={`/${post?.slug}`}
                    showFooter={true}
                  />
                </div>
              ))}
            </div>
            {posts?.length > 0 && !resetpagi && (
              <div className="pt-8 flex justify-center">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={Math.ceil(Number(totalPosts) / 10)}
                  onPageChange={handleRouter}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={1}
                  activeClassName="bg-blue-500 text-white"
                  previousClassName="border border-gray-500 rounded px-3 py-1 mr-2"
                  nextClassName="border border-gray-500 rounded px-3 py-1 ml-2"
                  breakClassName="border border-gray-500 rounded px-3 py-1 mx-1"
                  disabledClassName="text-gray-500"
                  forcePage={Number(router.query.page) - 1}
                  containerClassName="flex items-center space-x-2"
                  pageClassName="border border-gray-500 rounded px-3 py-1"
                />
              </div>
            )}
          </>
        )}
        {posts?.length === 0 && !isLoading && (
          <>
            <div className="flex items-center justify-center h-[40vh] text-center">
              Không tìm được kết quả phù hợp
            </div>
          </>
        )}

        {isLoading && <Loading />}
      </div>
    </>
  );
};
