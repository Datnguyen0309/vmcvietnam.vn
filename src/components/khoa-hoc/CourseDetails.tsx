"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { courses } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";
import { Loading } from "../Loading";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export const CourseDetails = ({ CourseData }: { CourseData: any }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [postsWp, setpostsWp] = useState<any>();

  const { slug } = router.query;
  useEffect(() => {
    const getpostsWp = async () => {
      try {
        const res = await fetch(`/api/post-course/?slug=${slug}`, {
          next: { revalidate: 3 }
        });
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts } = data;
        posts?.length && setpostsWp(posts[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getpostsWp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  if (!CourseData) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-8">
        <div className="w-full md:col-span-7 space-y-6 order-1 md:order-1">
          <h1 className="text-2xl font-bold text-[#4A306D]">
            THÔNG TIN KHÓA HỌC
          </h1>
          <p className="text-gray-600">
            {CourseData?.description ||
              "Khóa học online thiết kế cơ bản là một chương trình giáo dục trực tuyến giúp cho những người mới bắt đầu muốn học về thiết kế đồ họa được nắm vững những kiến thức cơ bản nhất."}
          </p>
          <Button
            variant="secondary"
            className="bg-[#4A306D] text-white hover:bg-[#4A306D]/90"
          >
            THÔNG TIN CHI TIẾT
          </Button>
          <div
            dangerouslySetInnerHTML={{
              __html: clean(
                postsWp?.content?.rendered || defautlHtmlCourseDetail
              )
            }}
          />
        </div>

        <div className="w-full md:col-span-5 space-y-6 order-2 md:order-2">
          <Card
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "10px",
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px"
            }}
          >
            <div className="relative mb-6">
              <Image
                src={CourseData?.image || "/assets/blog.jpeg"}
                alt="Course preview"
                width={468}
                height={468}
                className="rounded-lg w-full"
                style={{
                  borderRadius: "6px",
                  borderTopLeftRadius: "25px",
                  objectFit: "cover"
                }}
              />
              <Badge
                className="absolute top-[30px] left-[10px] bg-[#f55500] text-white rounded-full flex items-center justify-center text-[20px] font-[700]"
                style={{
                  width: "58px",
                  height: "58px"
                }}
                variant="secondary"
              >
                30%
              </Badge>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex  items-center gap-2">
                <span className="text-gray-500 line-through">
                  {formatPrice(CourseData.price || 0)}
                </span>
                <span className="text-[16px] lg:text-[30px] font-bold text-[#4A306D]">
                  {formatPrice(CourseData.price || 0)}
                </span>
              </div>

              <Button
                className="w-full bg-[#4A306D] lg:text-[16px] font-[700] hover:bg-[#4A306D] "
                style={{
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
              >
                HOTLINE: 091 234 5678
              </Button>
              <Button
                className="w-full bg-[#fff] text-[#4A306D] hover:bg-[#4A306D] hover:text-[#fff] lg:text-[16px] font-[700] border-2 border-[#4A306D] "
                style={{
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
              >
                ĐĂNG KÝ NGAY
              </Button>
            </div>
            <div className="flex items-center justify-left">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border h-8 w-8 text-center text-gray-600 bg-[#f1f1f1] hover:bg-gray-200"
              >
                -
              </button>
              <span className="border-t border-b h-8 w-12 flex items-center justify-center text-black bg-[#f1f1f1]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border h-8 w-8 text-center text-gray-600 bg-[#f1f1f1] hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <button className="w-full bg-[#f55500] hover:bg-orange-600 font-[700] text-[16px] border-none p-2 text-white mb-[16px]">
              THÊM VÀO GIỎ HÀNG
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const defautlHtmlCourseDetail = ` 
          <p className="text-gray-600">
            Khóa học cung cấp cho học viên những kỹ năng và kiến thức cần thiết
            để tạo ra những hình ảnh và đồ họa chuyên nghiệp.
          </p>

          <p className="text-gray-600">
            Khóa học được thiết kế linh hoạt, cho phép học viên tự túy chỉnh
            thời gian học tập phù hợp với lịch trình của mình. Ngoài ra, học
            viên có thể tham gia vào các hoạt động và bài tập thực hành để rèn
            luyện kỹ năng của mình.
          </p>`;
