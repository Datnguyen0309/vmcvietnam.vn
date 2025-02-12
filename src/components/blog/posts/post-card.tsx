import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/utils/post";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/post/${post.slug}`}>
        <div className="aspect-video relative">
          <Image
            src={post.imageUrl}
            alt=""
            className="object-cover w-full h-full"
            width={500}
            height={300}
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
