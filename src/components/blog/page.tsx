import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { clean } from "../lib/sanitizeHtml";
import { RecentPosts, RecentPostsSkeleton } from "./posts/recent-posts";
import { ConsultationCard } from "./posts/ConsultationCard";

export const Blog = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const categoryFromUrl = router.query.category as string | undefined;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryResponse = await fetch(`/api/categories`);
        const postResponse = await fetch(`/api/posts?page=1`);

        if (!categoryResponse.ok || !postResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const { categories } = await categoryResponse.json();
        const { posts } = await postResponse.json();
        setCategories(categories);
        setPosts(posts);
        const defaultSlug = categoryFromUrl || categories[0]?.slug || null;
        setSelectedCategory(defaultSlug);

        const categoryObj = categories.find((cat: any) => cat.slug === defaultSlug);
        const initialFiltered = posts.filter((post: any) =>
          post.categories?.includes(categoryObj?.id)
        );
        setFilteredPosts(initialFiltered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryFromUrl]);

  useEffect(() => {
    if (selectedCategory && categories.length && posts.length) {
      const category = categories.find((cat: any) => cat.slug === selectedCategory);
      if (category) {
        const filtered = posts.filter((post: any) =>
          post.categories?.includes(category.id)
        );
        setFilteredPosts(filtered);
      }
    }
  }, [selectedCategory, categories, posts]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2, 5);
  const sregularPosts = filteredPosts.slice(5, 10);
  const createArray = (n: number) => Array.from({ length: n } as ArrayLike<unknown>);

  const SkeletonCard = ({ height = 225 }) => (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-0">
        <div className="relative">
          <div className={`w-full h-[${height}px] bg-gray-200`} />
          <div className="py-6 px-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SidebarSkeleton = () => (
    <Card>
      <CardTitle className="text-lg font-bold text-[#463266] pb-2">
        CHUYÊN MỤC BÀI VIẾT
      </CardTitle>
      <ul className="space-y-2 bg-white border border-gray-200 rounded-lg p-[15px]">
        {createArray(5).map((_, i) => (
          <li key={i} className="h-4 bg-gray-200 rounded w-3/4" />
        ))}
      </ul>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {createArray(2).map((_, i) => (
                <SkeletonCard key={i} height={225} />
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {createArray(3).map((_, i) => (
                <SkeletonCard key={i} height={180} />
              ))}
            </div>

            <div className="space-y-6">
              {createArray(5).map((_, i) => (
                <SkeletonCard key={i} height={200} />
              ))}
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post: any) => (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/tin-tuc/${post.slug}`}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={post.featured_image || "/assets/blog.jpeg"}
                        alt={post.title.rendered}
                        width={500}
                        height={300}
                        className="object-cover w-full h-[225px]"
                      />
                      <div className="py-6 px-4">
                        <h2 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">
                          {post.title.rendered}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }} />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {regularPosts.map((post: any) => (
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
                        <p className="text-sm text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }} />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {sregularPosts.map((post: any) => (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/tin-tuc/${post.slug}`}>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <Image
                          src={post.featured_media_url || "/assets/blog.jpeg"}
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
                        <p className="text-muted-foreground line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }} />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <Card>
            <CardTitle className="text-lg font-bold text-[#463266] pb-2">
              CHUYÊN MỤC BÀI VIẾT
            </CardTitle>
            <ul className="space-y-2 bg-white border border-gray-200 rounded-lg p-[15px]">
              {categories.map((category: any) => (
                <li key={category.id} className="flex items-center">
                  <button
                    onClick={() => {
                      router.push(`/tin-tuc?category=${category.slug}`);
                      setSelectedCategory(category.slug);
                    }}
                    className={`text-left w-full hover:text-red-600 ${selectedCategory === category.slug
                      ? "text-red-600 font-bold"
                      : ""}`}
                  >
                    {category.name} ({category.count || 0})
                  </button>
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
