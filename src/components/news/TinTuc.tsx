import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CardPost } from "../CardBlogVert";
import { Loading } from "../Loading";

interface ListPostsProps {
  handleRouter?: (params: { selected: number }) => void;
}

export default function BlogListing({ handleRouter }: ListPostsProps) {
  const router = useRouter();
  const page = router.query.page || "1";
  const category = router.query.category || "";
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/posts/?type=tin-tuc&category=${category}&page=${page}`
        );
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPosts(data.totalPosts || "0");
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getPosts();
  }, [router.isReady, page, category]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, recentRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/posts/recent"),
        ]);
        const categories = await catRes.json();
        const recent = await recentRes.json();
        setCategories(categories || []);
        setRecentPosts(recent || []);
      } catch (error) {
        console.error("Meta fetch error", error);
      }
    };
    fetchMeta();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {!isLoading ? (
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <CardPost
                  key={post?.id}
                  id={post?.id}
                  slug={post?.slug}
                  imageUrl={post?.featured_image || ""}
                  title={post?.title}
                  excerpt={post?.excerpt}
                  content={""}
                  category={""}
                  date={""}
                />
              ))}
              {posts?.length === 0 && (
                <div className="flex items-center justify-center h-40vh">
                  Dữ liệu đang được cập nhật
                </div>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#4A306D] mb-4">
              CHUYÊN MỤC BÀI VIẾT
            </h2>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={{
                      pathname: "/tin-tuc",
                      query: { category: category.slug },
                    }}
                    className="flex items-center justify-between text-gray-600 hover:text-[#4A306D]"
                  >
                    <span>{category.name}</span>
                    <span>({category.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#4A306D] mb-4">
              BÀI VIẾT MỚI ĐĂNG
            </h2>
            <div className="space-y-4">
              {recentPosts.slice(0.5).map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h3 className="text-sm text-gray-600 group-hover:text-[#4A306D] line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
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
    </div>
  );
}
