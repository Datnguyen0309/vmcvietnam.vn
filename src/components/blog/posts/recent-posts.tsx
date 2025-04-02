import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const RecentPosts = ({ posts }: { posts: any[] }) => {
  return (
    <Card>
      <CardTitle className="text-lg font-bold  text-[#463266] pb-2">
        BÀI VIẾT MỚI ĐĂNG
      </CardTitle>
      <ul className="space-y-2">
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} className="flex items-center space-x-4">
            <Link
              href={`/tin-tuc/${post.slug}`}
              className="flex items-center space-x-4 text-sm font-bold transition-colors hover:text-red-500"
            >
              <div className="w-[100px] h-[70px] flex-shrink-0">
                <Image
                  src={post.featured_image || "/assets/blog.jpeg"} 
                  alt={post.title?.rendered || "No title"}
                  className="w-full h-full object-cover rounded"
                  width={700}
                  height={300}
                />
              </div>
              <span>{post.title?.rendered || "No title"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export const RecentPostsSkeleton = () => {
  return (
    <Card>
      <CardTitle className="text-lg font-bold text-[#463266] pb-2">
        BÀI VIẾT MỚI ĐĂNG
      </CardTitle>
      <ul className="space-y-4">
        {Array.from({ length: 5 } as ArrayLike<unknown>).map((_, i) => (
          <li key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="w-[100px] h-[70px] bg-gray-200 rounded flex-shrink-0" />
            <div className="flex-1 h-4 bg-gray-300 rounded w-3/4" />
          </li>
        ))}
      </ul>
    </Card>
  );
};
