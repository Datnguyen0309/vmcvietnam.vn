import { Loading } from "@/components/Loading";
import { clean } from "@/components/lib/sanitizeHtml";
import { formatDate } from "@/utils/date";
import dynamic from "next/dynamic";
import { useRouter } from "next/router"; // Import from next/router
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { LayoutBottom } from "../LayoutBottom";

const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);

interface ListPostsProps {
  handleRouter?: (params: { selected: number }) => void;
}

export const ListPosts = ({ handleRouter }: ListPostsProps) => {
  const router = useRouter(); // Use useRouter hook to access router object
  const page = router.query.page || "1"; // Use router.query to get query parameters

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/?type=notifis&page=${page}`, {
          next: { revalidate: 3 }
        });

        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;
        posts?.length && setPosts(posts);
        totalPosts && setTotalPosts(totalPosts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page]);
  return (
    <LayoutBottom>
      <div>
        <h1 className="text-2xl font-bold text-[#213F99] pb-5 text-center lg:text-left">
          BẢN TIN ĐẠI NAM
        </h1>
        {!isLoading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {posts?.map((post: any, index: number) => (
              <CardBlogVert
                key={index}
                title={clean(post?.title?.rendered)}
                date={post?.date ? formatDate(post.date) : ""}
                desc={clean(post?.excerpt?.rendered)}
                bgTag="#f37423"
                image={post?.featured_image || ""}
                path={`/${post?.slug}`}
                showFooter={true}
              />
            ))}
            {posts?.length === 0 && (
              <div className="flex items-center justify-center h-40vh">
                Dữ liệu đang được cập nhật
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>

      {posts?.length > 0 && (
        <div className="flex justify-center pt-8">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={Math.ceil(Number(totalPosts) / 10)}
            onPageChange={handleRouter}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            activeClassName="bg-blue-500"
            previousClassName="border border-gray-500 rounded px-3 py-1 mr-2"
            nextClassName="border border-gray-500 rounded px-3 py-1 ml-2"
            breakClassName="border border-gray-500 rounded px-3 py-1 mx-1"
            disabledClassName="text-gray-500"
            forcePage={Number(page) - 1}
            containerClassName="flex items-center space-x-2"
            pageClassName="border border-gray-500 rounded px-3 py-1"
          />
        </div>
      )}
    </LayoutBottom>
  );
};
