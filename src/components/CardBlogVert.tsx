"use client";
import { clean } from "@/components/lib/sanitizeHtml";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/utils/post";
import Image from "next/image";
import Link from "next/link";

interface CardBlogVertProps {
  title: string;
  desc: string;
  image?: string;
  path?: string;
  bgTag?: string;
  date?: string;
  preview?: boolean;
  showFooter?: boolean;
  height?: string;
}

export const CardBlogVert = ({
  title,
  desc,
  image,
  path,
  bgTag,
  date,
  preview,
  showFooter,
  height
}: CardBlogVertProps) => {
  return (
    <Link
      href={path ?? "#"}
      className="block overflow-hidden group transition-shadow duration-300 ease-in-out hover:shadow-lg  "
    >
      {!preview && (
        <div className="relative overflow-hidden h-[height] ">
          <Image
            width={268}
            height={245}
            src={image || `/assets/blog.jpeg`}
            alt={title || `image`}
            placeholder="empty"
            className="object-cover w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
          />
          <div className="absolute bottom-0 left-0">
            <div
              className="px-2 py-1 text-sm text-white bg-[#F37423] whitespace-nowrap"
              style={{ backgroundColor: bgTag || "#F37423" }}
            >
              {date}
            </div>
          </div>
        </div>
      )}
      <div className="p-3 text-black bg-white min-h-[160px] mb-4">
        <h4
          className="mt-3 text-xl font-bold transition-all duration-300 ease-in-out line-clamp-2 group-hover:text-orange-500"
          style={{
            lineHeight: "28px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maxHeight: "5em"
          }}
          dangerouslySetInnerHTML={{ __html: clean(title) }}
        />
        <p
          className="mt-1 text-sm text-gray-500"
          style={{
            lineHeight: "24px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
          dangerouslySetInnerHTML={{ __html: clean(desc) }}
        />
        {showFooter && ( // Conditionally render the footer
          <div className="flex items-center justify-between mt-2 text-md">
            <Link href={path ?? "#"}>Đọc thêm</Link>
            <span className="font-semibold">Admin</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export const CardBlogVertA = ({
  title,
  tag,
  image,
  path,
  bgTag,
  date
}: {
  title: string;
  desc: string;
  tag: string;
  image?: string;
  path?: string;
  bgTag?: string;
  date?: string;
}) => {
  return (
    <Link
      href={path ?? "#"}
      className="flex flex-col sm:flex-row justify-between pt-4"
    >
      <div className="flex flex-1 relative items-start">
        <div className="w-full sm:w-3/4 z-2">
          <div className="relative overflow-hidden h-18">
            <Image
              width={365}
              height={200}
              src={image || `/assets/blog.jpeg`}
              alt={title || `image`}
              className="object-cover w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 bg-[#f37423]">
              <span
                className={`text-sm p-1 whitespace-nowrap bg-${
                  bgTag || "green-500"
                }`}
              >
                {tag}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-0 flex flex-1 flex-col justify-center">
        <h4
          className="pt-1 text-md sm:text-sm md:text-md lg:text-sm  transition-all ease duration-300"
          dangerouslySetInnerHTML={{ __html: title }}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maxHeight: "3.5em" // Adjust as needed
          }}
        />
        <div className="flex flex-row space-x-2 text-md sm:text-sm md:text-md lg:text-sm my-2.5">
          <span className="font-semibold">Đọc thêm</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};

export const  CardPost = (props: Post) => {
  const { id, slug, imageUrl, title, excerpt } = props;
  return (
    <Card
      className="group overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/tin-tuc/${slug}`}>
        <div className="relative  overflow-hidden">
          <Image
            src={imageUrl || "/assets/blog.jpeg"}
            alt={title}
            width={400}
            height={225}
            className="object-cover transition-transform group-hover:scale-105 w-full h-[256px]"
          />
        </div>

        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-[#4A306D] line-clamp-2 mb-2">
            {title}
          </h3>
          <p
            className="text-gray-600 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: clean(excerpt) }}
          ></p>
        </CardContent>
      </Link>
    </Card>
  );
};
