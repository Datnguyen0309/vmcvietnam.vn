import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { clean } from "../lib/sanitizeHtml";
import { Loading } from "../Loading";
import { RecentPosts } from "./posts/recent-posts";
import { ConsultationCard } from "./posts/ConsultationCard";

export const Blog = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryResponse = await fetch(`/api/categories`);
        if (!categoryResponse.ok) {
          throw new Error(`Categories fetch failed with status: ${categoryResponse.statusText}`);
        }
        const { categories } = await categoryResponse.json();

        const postResponse = await fetch(`/api/posts?page=1`);
        if (!postResponse.ok) {
          throw new Error(`Posts fetch failed with status: ${postResponse.statusText}`);
        }
        const { posts } = await postResponse.json();
        console.log("Posts Data:", posts);
        setCategories(categories);
        setPosts(posts);

        setSelectedCategory(categories[0]?.slug || null);

        const initialFiltered = posts.filter(
          (post: any) =>
            post.categories &&
            post.categories.includes(categories[0]?.id)
        );
        setFilteredPosts(initialFiltered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(
        (cat: any) => cat.slug === selectedCategory
      );
      if (category) {
        const filtered = posts.filter(
          (post: any) =>
            post.categories && post.categories.includes(category.id)
        );
        setFilteredPosts(filtered);
      }
    }
  }, [selectedCategory, categories, posts]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2, 5);
  const sregularPosts = filteredPosts.slice(5, 10);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post: any) => (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={post.featured_image || "/assets/blog.jpeg"}
                        alt={post.title.rendered}
                        width={500}
                        height={300}
                        className="object-cover w-full h-[225px]"
                      />
                      <div className="py-6">
                        <h2 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">
                          {post.title.rendered}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }}
                        />
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
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={post.featured_media_url || "/assets/blog.jpeg"}
                        alt={post.title.rendered}
                        width={400}
                        height={225}
                        className="object-cover w-full h-[180px]"
                      />
                      <div className="py-4">
                        <h2 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">
                          {post.title.rendered}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }}
                        />
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
                <Link href={`/blog/${post.slug}`}>
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
                          dangerouslySetInnerHTML={{ __html: clean(post.excerpt.rendered) }}
                        />
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
            <CardTitle className="text-lg font-bold  text-[#463266] pb-2">
              CHUYÊN MỤC BÀI VIẾT
            </CardTitle>
            <ul className="space-y-2 bg-white border border-gray-200 rounded-lg p-[15px]">
              {categories.map((category: any) => (
                <li key={category.id} className="flex items-center">
                  <button
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`text-left w-full hover:text-red-600 ${selectedCategory === category.slug
                      ? "text-red-600 font-bold"
                      : ""
                      }`}
                  >
                    {category.name} ({category.count || 0})
                  </button>
                </li>
              ))}
            </ul>
          </Card>
          <RecentPosts posts={posts} />
          <ConsultationCard />
        </div>
      </div>
    </div>
  );
}
