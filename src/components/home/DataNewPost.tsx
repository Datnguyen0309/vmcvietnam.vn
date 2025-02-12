import { FaUser } from "react-icons/fa";
import { CardPost } from "../CardBlogVert";
import SectionTitle from "../SectionTitle";

export const LatestPosts = ({ posts }: { posts: any[] }) => {
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
        {posts.slice(0, 6).map((post) => (
          <CardPost
            key={post?.id}
            id={post?.id}
            slug={post?.slug}
            imageUrl={post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/assets/blog.jpeg"}
            title={post?.title?.rendered || "Untitled"}
            excerpt={post?.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") || "No excerpt available"}
            content={post?.content?.rendered || ""}
            category={""}
            date={post?.date || ""}

          />
        ))}
      </div>
    </section>
  );
};
