"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { addToCartThunk } from "@/redux/thunks/oderThunks";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [postsWp, setpostsWp] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Thêm vào giỏ hàng nhưng không mở modal
  const handleAddToCart = async () => {
    try {
      // Dispatch thunk, nó sẽ xử lý logic thêm sản phẩm
      await dispatch(
        addToCartThunk({
          product_id: Number(CourseData.id),
          name: CourseData.name,
          image: CourseData.image,
          price_unit: Number(CourseData.price),
          quantity: 1,
        } as CartItem)
      );
      // Sau khi thành công, bạn có thể hiển thị thông báo cho người dùng nếu cần
      console.log("Sản phẩm đã được thêm vào giỏ hàng thành công.");
    } catch (error) {
      // Xử lý lỗi nếu API hoặc quá trình dispatch gặp sự cố
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  // Mở modal giỏ hàng nhưng không thêm sản phẩm
  const handleBuyNow = async () => {
    await handleAddToCart(); // Chờ thêm vào giỏ xong mới mở modal
    setIsCartOpen(true);
  };
  
  const { slug } = router.query;
  useEffect(() => {
    const getpostsWp = async () => {
      try {
        const res = await fetch(`/api/post-course/?slug=${slug}`, {
          next: { revalidate: 3 }
        });
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts } = data;
        console.log(data)
        posts?.length && setpostsWp(posts[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getpostsWp();
  }, [slug]);

  if (!CourseData) {
    return <Loading />;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-8">
        <div className="w-full md:col-span-7 space-y-6 order-1 md:order-1">
          <h1 className="text-2xl font-bold text-[#4A306D]">THÔNG TIN KHÓA HỌC</h1>
          <p className="text-gray-600">
            {CourseData?.description || "Khóa học online thiết kế cơ bản giúp người mới bắt đầu học về thiết kế đồ họa."}
          </p>
          <Button
            variant="secondary"
            className="bg-[#4A306D] text-white hover:bg-[#4A306D]/90"
            onClick={() => setShowDetails(!showDetails)}
          >
            THÔNG TIN CHI TIẾT
          </Button>
          {showDetails && (
            <div
              dangerouslySetInnerHTML={{
                __html: clean(postsWp?.content?.rendered || defautlHtmlCourseDetail)
              }}
            />
          )}
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
              {/* <Badge
                className="absolute top-[30px] left-[10px] bg-[#f55500] text-white rounded-full flex items-center justify-center text-[20px] font-[700]"
                style={{
                  width: "58px",
                  height: "58px"
                }}
                variant="secondary"
              >
                30%
              </Badge> */}
            </div>
            <div className="space-y-6 p-6">
              <h3 className=" text-[20px] text-[#4A306D] line-clamp-2 min-h-[48px] font-bold">
                {CourseData?.name}
              </h3>
              <div className="flex items-center gap-2 mt-[0px!important]">
                <span className="text-gray-500 line-through">
                  {formatPrice(CourseData.price || 0)}
                </span>
                <span className="text-[16px] lg:text-[30px] font-bold text-[#4A306D]">
                  {formatPrice(CourseData.price || 0)}
                </span>
              </div>

              <Button
                className="w-full bg-[#4A306D] lg:text-[16px] font-[700] hover:bg-[#4A306D]"
                style={{
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
              >
                HOTLINE: 091 234 5678
              </Button>
              {/* <Button
                onClick={handleBuyNow}
                className="w-full bg-[#fff] text-[#4A306D] hover:bg-[#4A306D] hover:text-[#fff] lg:text-[16px] font-[700] border-2 border-[#4A306D]"
                style={{
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
              >
                MUA NGAY
              </Button> */}
            </div>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="w-full bg-[#f55500] hover:bg-orange-600 font-[700] text-[16px] border-none p-2 text-white mb-[16px]">
              THÊM VÀO GIỎ HÀNG
            </button>
          </Card>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 overflow-y-auto p-6 transition-transform transform sm:mt-[130px]"
          >
            <button onClick={toggleCart} className="absolute top-4 right-4 text-gray-600">✕</button>
            <h2 className="text-xl font-bold text-[#4A306D] ">Giỏ hàng của bạn</h2>
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-4">
                <Image
                  src={CourseData?.image || "/assets/blog.jpeg"}
                  alt="Course preview"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-semibold">{CourseData?.name}</p>
                  <p className="text-sm text-gray-500">{formatPrice(CourseData.price || 0)}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng giá:</span>
                <span>{formatPrice(CourseData.price || 0)}</span>
              </div>
              <Button onClick={() => router.push('/thanh-toan')} className="w-full bg-[#4A306D]  hover:bg-[#FF8162] text-white mt-4">
                THANH TOÁN
              </Button>
              <Link href="/gio-hang"><Button variant="outline" className="w-full mt-2">XEM GIỎ HÀNG</Button></Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export const defautlHtmlCourseDetail = ` 
<p className="text-gray-600">Khóa học cung cấp cho học viên những kỹ năng và kiến thức cần thiết để tạo ra những hình ảnh và đồ họa chuyên nghiệp.</p>
<p className="text-gray-600">Khóa học được thiết kế linh hoạt, cho phép học viên tự tùy chỉnh thời gian học tập phù hợp với lịch trình của mình.</p>`;
