import { FaUser } from "react-icons/fa";
import { CardPost, SkeletonCardPost } from "../CardBlogVert";
import SectionTitle from "../SectionTitle";
import { clean } from "../lib/sanitizeHtml";
import { useEffect, useState } from "react";

export const LatestPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postResponse = await fetch(`/api/posts-api/?type=news&page=1`);
        if (!postResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postResponse.statusText}`);
        }
        const data = await postResponse.json();
        setPosts(data.posts || []);
        setLoading(false); // Data fetched, set loading to false
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container max-w-7xl mx-auto px-4 lg:py-16">
      <div className="text-center space-y-6 mb-12">
        <div className="flex justify-center mb-8">
          <SectionTitle title={"TIN TỨC"} icon={<FaUser />} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A306D]">
          Các bài viết mới nhất
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display skeleton loader while loading */}
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonCardPost key={index} />)
          : posts.slice(0, 6).map((post, index) => (
            <CardPost
              key={index}
              slug={post?.slug}
              imageUrl={post?.featured_image || "/assets/blog.jpeg"}
              title={clean(post?.title.rendered) || ""}
              excerpt={clean(post?.excerpt.rendered) || "No excerpt available"}
              content={post?.content?.rendered || ""}
              category={""}
              date={post?.date || ""}
              id={""}
            />
          ))}
      </div>
    </section>
  );
};
