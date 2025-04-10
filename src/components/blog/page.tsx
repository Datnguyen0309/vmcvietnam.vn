import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Category } from "@/pages/api/categories";
import { Post } from "@/pages/api/posts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";
import { ConsultationCard } from "./posts/ConsultationCard";
import { RecentPosts, RecentPostsSkeleton } from "./posts/recent-posts";

const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-0">
        <div className="relative">
          <div className="bg-gray-300 w-full h-[180px] rounded-md" />
          <div className="py-4 px-4">
            <div className="bg-gray-300 w-3/4 h-6 mb-2 rounded" />
            <div className="bg-gray-300 w-1/2 h-4 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Blog = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const postsPerPage = 8;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (selectedCategory !== null) {
        setIsLoading(true); // Bắt đầu loading
        const res = await fetch(
          `/api/posts?categoryId=${selectedCategory}&page=${currentPage}&perPage=${postsPerPage}`
        );
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory, currentPage]);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
              : posts.slice(0, 6).map((post: any) => (
                <Card key={post.id} className="overflow-hidden">
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={post.featured_media_url || "/assets/blog.jpeg"}
                          alt={post.title.rendered}
                          width={400}
                          height={225}
                          className="object-cover w-full h-[180px]"
                        />
                        <div className="py-4 px-4">
                          <h2 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">
                            {post.title.rendered}
                          </h2>
                          <p
                            className="text-sm text-muted-foreground line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: clean(post.excerpt.rendered),
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>

          <div className="space-y-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
              : posts.slice(6, 12).map((post: any) => (
                <Card key={post.id} className="overflow-hidden">
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-12 gap-6">
                        <div className="md:col-span-4">
                          <Image
                            src={post.featured_image || "/assets/blog.jpeg"}
                            alt={post.title.rendered}
                            width={300}
                            height={200}
                            className="object-cover w-full h-[200px] rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-8 flex flex-col justify-center">
                          <h2 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">
                            {post.title.rendered}
                          </h2>
                          <p
                            className="text-muted-foreground line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: clean(post.excerpt.rendered),
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span>{`Page ${currentPage} of ${totalPages}`}</span>

            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

        </div>

        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <Card>
            <CardTitle className="text-lg font-bold text-[#463266] pb-2">
              CHUYÊN MỤC BÀI VIẾT
            </CardTitle>
            <ul className="space-y-2 bg-white border border-gray-200 rounded-lg p-[15px]">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer ${selectedCategory === category.id ? "text-red-500 font-bold" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count || 0})
                </li>
              ))}
            </ul>
          </Card>
          {isLoading ? <RecentPostsSkeleton /> : <RecentPosts posts={posts} />}
          <ConsultationCard />
        </div>
      </div>
    </div>
  );
};
