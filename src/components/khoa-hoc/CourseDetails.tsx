import { Button } from "@/components/ui/button";
import type { CartItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { addToCartThunk } from "@/redux/thunks/oderThunks";
import { motion } from "framer-motion";
import { Award, BookOpen, ChevronDown, ChevronUp, Clock, ShoppingCart, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { clean } from "../lib/sanitizeHtml";
import { Badge } from "../ui/badge";


export const CourseDetails = ({ CourseData }: { CourseData: any }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // "info" or "content"
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      if (containerRect.top < 15) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset expanded state when changing tabs
  useEffect(() => {
    setIsExpanded(false);
  }, [activeTab]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [postsWp, setpostsWp] = useState<any>();

  // Thêm vào giỏ hàng nhưng không mở modal
  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCartThunk({
          product_id: Number(CourseData.id),
          name: CourseData.name,
          image: CourseData.image,
          price_unit: Number(CourseData.price),
          quantity: 1,
        } as CartItem)
      );
      console.log("Sản phẩm đã được thêm vào giỏ hàng thành công.");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  // Mở modal giỏ hàng nhưng không thêm sản phẩm
  const handleBuyNow = () => {
    const data: CartItem = {
      product_id: Number(CourseData.id),
      name: CourseData.name,
      image: CourseData.image,
      price_unit: Number(CourseData.price),
      quantity: 1,
    };
    localStorage.setItem("mua_ngay_item", JSON.stringify(data));
    router.push("/mua-ngay?type=mua-ngay");
  };

  const { slug } = router.query;
  useEffect(() => {
    const getpostsWp = async () => {
      try {
        const res = await fetch(`/api/post-course/?slug=${slug}`, {
          next: { revalidate: 3 },
        });
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts } = data;
        posts?.length && setpostsWp(posts[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getpostsWp();
  }, [slug]);

  // Skeleton loader for the page while data is loading
  if (!CourseData) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Skeleton for the main course section */}
          <div className="lg:w-2/3">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6 h-[450px] animate-pulse"></div>
            <div className="p-6">
              {/* Skeleton for tab buttons */}
              <div className="flex mb-6">
                <div className="w-32 h-10 bg-gray-300 rounded-md mr-2 animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
              {/* Skeleton for content */}
              <div className="h-[200px] bg-gray-300 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton for the sticky sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
              <div className="p-6">
                <div className="w-40 h-6 bg-gray-300 mb-4 animate-pulse"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-gray-300 p-2 rounded-md animate-pulse"></button>
                  <button className="w-full bg-gray-300 p-2 rounded-md animate-pulse"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8" ref={containerRef}>
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
            <Image
              src={postsWp?.featured_image || "/assets/blog.jpeg"}
              alt="Course banner"
              className="w-full h-[450px] object-cover"
              width={400}
              height={200}
            />
            <div className="p-6">
              <div className="mb-6">
                <div className="flex">
                  <button
                    className={`px-4 py-3 text-[md] font-medium flex-1 ${activeTab === "info" ? "bg-[#4A306D] text-white" : "bg-gray-100 text-gray-500"}`}
                    onClick={() => setActiveTab("info")}
                  >
                    {activeTab === "info" && <span className="mr-2">📒</span>}
                    Thông tin khóa học
                  </button>
                  <button
                    className={`px-4 py-3 text-md font-medium flex-1 ${activeTab === "content" ? "bg-[#4A306D] text-white" : "bg-gray-100 text-gray-500"}`}
                    onClick={() => setActiveTab("content")}
                  >
                    📜 Nội dung khóa học
                  </button>
                </div>
                <div className="h-1 w-full bg-[#4A306D]"></div>
              </div>

              {activeTab === "info" && (
                <div>
                  <div
                    ref={contentRef}
                    className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-full" : "max-h-[200px]"}`}
                    style={{
                      maskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 70%, transparent 100%)",
                      WebkitMaskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 70%, transparent 100%)",
                    }}
                  >
                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: clean(CourseData?.description || defautlHtmlCourseDetail),
                      }}
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-1 px-4 py-2 text-[#7b1fa2] font-medium hover:bg-purple-50 rounded-md transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Thu gọn <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Xem thêm <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div>
                  <div
                    ref={contentRef}
                    className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-full" : "max-h-[700px]"}`}
                    style={{
                      maskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 70%, transparent 100%)",
                      WebkitMaskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 70%, transparent 100%)",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: clean(postsWp?.content?.rendered || defautlHtmlCourseDetail),
                      }}
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-1 px-4 py-2 text-[#7b1fa2] font-medium hover:bg-purple-50 rounded-md transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Thu gọn <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Xem thêm <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3" ref={stickyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-xl ${isSticky ? "lg:sticky lg:top-[180px]" : ""
              }`}
          >
            <div className="relative">
              {/* <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-1">Khóa học nổi bật</Badge>
              </div> */}
              <div className="relative overflow-hidden group">
                <Image
                  src={CourseData?.image || "/assets/blog.jpeg"}
                  alt="Course thumbnail"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">{CourseData?.name}</h2>
              <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl">
                <div>
                  <span className="text-gray-500 line-through text-sm">
                    {CourseData?.price_promo ? (
                      <span className="text-gray-500 line-through text-sm">
                        {Number(CourseData?.price_promo).toLocaleString("vi-VN")} đ
                      </span>
                    ) : null}
                  </span>
                </div>
                <span className="text-2xl font-bold text-[#4A306D]">   {Number(
                  CourseData?.price || "0"
                ).toLocaleString("vi-VN")}{" "}
                  đ</span>
              </div>

              <div className="space-y-5 mb-8">
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Clock className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Thời gian</span>
                    <span className="font-medium text-gray-900">{CourseData?.duration || "Thời gian"}</span>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpen className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Số bài học</span>
                    <span className="font-medium text-gray-900">
                      {CourseData?.number_of_lessons ? (
                        Number(CourseData.number_of_lessons).toLocaleString("vi-VN") + " Bài học"
                      ) : null}
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Học viên</span>
                    <span className="font-medium text-gray-900">{CourseData?.number_of_student || ""}</span>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Award className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Cấp chứng nhận hoàn thành</span>
                    <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-[#4A306D] text-lg font-bold hover:bg-[#3a2557] h-14 group relative overflow-hidden"
                  style={{
                    borderTopLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}
                  onClick={handleBuyNow}
                >
                  <span className="absolute right-0 h-full aspect-square bg-[#3a2557] flex items-center justify-center -mr-2 group-hover:mr-0 transition-all duration-300">
                    🛒
                  </span>
                  <span className="group-hover:mr-8 transition-all duration-300">MUA NGAY</span>
                </Button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#f55500] hover:bg-[#d94c00] font-bold text-lg border-none p-2 text-white h-14 transition-all duration-300 relative group overflow-hidden"
                  style={{
                    borderTopLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}
                >
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingCart className="w-5 h-5" />
                  </span>
                  <span className="group-hover:translate-x-6 inline-block transition-transform duration-300">
                    THÊM VÀO GIỎ HÀNG
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const defautlHtmlCourseDetail = ` 
<p className="text-gray-600">Khóa học cung cấp cho học viên những kỹ năng và kiến thức cần thiết để tạo ra những hình ảnh và đồ họa chuyên nghiệp.</p>
<p className="text-gray-600">Khóa học được thiết kế linh hoạt, cho phép học viên tự tùy chỉnh thời gian học tập phù hợp với lịch trình của mình.</p>`;
