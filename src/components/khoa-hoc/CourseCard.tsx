import { Badge } from "@/components/ui/badge";
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
            alt={course?.name}
            width={400}
            height={400}
            className="w-full aspect-square object-cover transition-transform"
          />
          {/* <Badge
            className="absolute top-[30px] left-[-10px] bg-[#f55500] text-white rounded-full flex items-center justify-center text-[16px] font-[700] shadow-lg transition-transform transform hover:scale-110"
            style={{
              width: "48px",
              height: "48px",
              zIndex: 10
            }}
            variant="secondary"
          >
            30%
          </Badge> */}
        </div>
        <CardContent className="p-4">
          <h3 className=" text-[20px] text-[#4A306D] line-clamp-2 min-h-[48px] font-bold">
            {course?.name}
          </h3>

          <div className="mt-4 space-y-2 flex justify-between">
            <div className="text-gray-500 line-through mt-3">
            {Number( course?.price).toLocaleString("vi-VN")} đ
            </div>
            <div
              className="text-[15px] font-bold text-[#fff]"
              style={{
                background: "#4A306D",
                padding: "5px 8px",
                borderRadius: "20px"
              }}
            >
             {Number( course?.price).toLocaleString("vi-VN")} đ
            </div>
          </div>
        </CardContent>
        <div className="border-t border-gray-200 mx-4"></div>
        <CardFooter className="p-4  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={course?.teacher?.image||"/assets/blog.jpeg"}
              alt={course?.teacher?.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600">
              {course?.teacher?.name}
            </span>
          </div>
          <Link
            href={`/${course?.slug_url}`}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
          >
            Chi tiết
            <ChevronRight className="w-4 h-4" />
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
};
