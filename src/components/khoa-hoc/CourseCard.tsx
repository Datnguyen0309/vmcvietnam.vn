import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

export const CourseCard = ({ course }: { course: any }) => {
  return (
    <Link href={`/${course?.slug_url}`}>
      <Card
        className={`
            overflow-visible bg-white relative shadow-md 
            rounded-[6px] rounded-tl-[25px] rounded-br-[25px] 
            transition-transform duration-300 ease-in-out 
            transform hover:translate-y-[-5px] 
            hover:opacity-90
          `}
      >
        <div className="relative">
          <Image
            src={course?.image}
            alt={course?.name || "aaaa"}
            className="w-full h-[205px] object-cover group-hover:scale-105 transition-transform duration-500"
            width={600}
            height={400}
          />
        </div>
        <CardContent className="p-4">
          <h3 className=" text-[20px] text-[#4A306D] line-clamp-2 min-h-[48px] font-bold">
            {course?.name}
          </h3>

          <div className="mt-4 space-y-2 flex justify-between">
            <div className="text-gray-500 line-through mt-3">
              {course?.price_promo !== 0 && course?.price_promo ?
                Number(course.price_promo).toLocaleString("vi-VN") + " đ"
                : null}
            </div>

            <div
              className="text-[15px] font-bold text-[#fff]"
              style={{
                background: "#4A306D",
                padding: "5px 8px",
                borderRadius: "20px"
              }}
            >
              {Number(course?.price).toLocaleString("vi-VN")} đ
            </div>
          </div>
        </CardContent>
        <div className="border-t border-gray-200 mx-4"></div>
        <CardFooter className="p-4  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={course?.teacher?.image || "/assets/blog.jpeg"}
              alt={course?.teacher?.name || "aaa"}
              width={32}
              height={32}
              className="rounded-full object-cover"
              style={{ aspectRatio: '1 / 1' }}
            />
            <span className="text-sm text-gray-600">
              {course?.teacher?.name}
            </span>
          </div>
          <div
            className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
          >
            Chi tiết
            <ChevronRight className="w-4 h-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};


export const SkeletonCourseCard = () => {
  return (
    <Card
      className={`
        overflow-visible bg-white relative shadow-md 
        rounded-[6px] rounded-tl-[25px] rounded-br-[25px]
        animate-pulse
      `}
    >
      <div className="relative w-full aspect-square bg-gray-200" />
      <CardContent className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-300 w-1/3 rounded" />
          <div className="h-6 bg-gray-300 w-1/3 rounded-full" />
        </div>
      </CardContent>
      <div className="border-t border-gray-200 mx-4"></div>
      <CardFooter className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-16" />
      </CardFooter>
    </Card>
  );
};
