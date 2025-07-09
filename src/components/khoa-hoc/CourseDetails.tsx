"use client"
import type { CartItem } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/store"
import { addToCartThunk } from "@/redux/thunks/oderThunks"
import { AnimatePresence, motion } from "framer-motion"
import { Award, BookOpen, Check, ChevronDown, ChevronUp, Clock, ShoppingCart, Star, Users } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { clean } from "../lib/sanitizeHtml"
import styles from "@/styles/Post.module.css";

export const CourseDetails = ({ CourseData }: { CourseData: any }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [activeTab, setActiveTab] = useState("info") // "info" or "content"
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { slug } = useRouter().query;
  const now = Date.now();
  const isValidExtra = !!CourseData?.descriptions_khoahoc?.replace(/<[^>]+>/g, '').trim();

  const isPromoValid =
    CourseData?.event_end_date && !isNaN(Date.parse(CourseData.event_end_date))
      ? new Date(CourseData.event_end_date).getTime() >= now
      : false;

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      if (containerRect.top < 15) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Reset expanded state when changing tabs
  useEffect(() => {
    setIsExpanded(false)
  }, [activeTab])

  const router = useRouter()
  const dispatch = useAppDispatch()
  const [postsWp, setpostsWp] = useState<any>()

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
        } as CartItem),
      )
      console.log("Sản phẩm đã được thêm vào giỏ hàng thành công.")
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error)
    }
  }

  // Mở modal giỏ hàng nhưng không thêm sản phẩm
  const handleBuyNow = () => {
    const data: CartItem = {
      product_id: Number(CourseData.id),
      name: CourseData.name,
      image: CourseData.image,
      price_unit: Number(CourseData.price),
      quantity: 1,
    }
    localStorage.setItem("mua_ngay_item", JSON.stringify(data))
    router.push("/mua-ngay?type=mua-ngay")
  }

  const handleBuyNowTrial = () => {
    const data: CartItem = {
      product_id: Number(CourseData.id),
      name: CourseData.name + " (Học thử)",
      image: CourseData.image,
      price_unit: 100000,
      quantity: 1,
    };
    localStorage.setItem("mua_ngay_item", JSON.stringify(data));
    router.push("/mua-ngay?type=trial");
  };

  useEffect(() => {
    if (!isValidExtra && activeTab === "extra") {
      setActiveTab("info")
    }
  }, [isValidExtra, activeTab])

  useEffect(() => {
    const getpostsWp = async () => {
      try {
        const res = await fetch(`/api/post-course/?slug=${slug}`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        const { posts } = data;
        if (posts?.length) setpostsWp(posts[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getpostsWp();
  }, [slug]);

  const stripEmptyP = (html: string) => {
    return html.replace(/<p>\s*<\/p>/g, "");
  };

  if (!postsWp) {
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
    )
  }


  // Lấy URL video từ trường ACF
  const videoUrl = postsWp.acf?.video_url;

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
    )
  }

  return (
    <div className="container max-w-7xl mx-auto py-12">
      <div className="flex flex-col lg:flex-row gap-10" ref={containerRef}>
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl mb-8 border border-gray-100"
          >
            {videoUrl && (
              <div className="video-container mb-8">
                <iframe
                  className="video-iframe"
                  src={`https://www.youtube.com/embed/${videoUrl.split("v=")[1]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="px-8 pb-8">
              <div className="mb-8">
                <div className="flex rounded-xl overflow-hidden shadow-md">
                  <button
                    className={`px-6 py-4 text-[md] font-medium flex-1 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "info"
                      ? "bg-gradient-to-r from-[#4A306D] to-[#3a2557] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    onClick={() => setActiveTab("info")}
                  >
                    <BookOpen className={`w-5 h-5 ${activeTab === "info" ? "text-white" : "text-[#4A306D]"}`} />
                    Thông tin khóa học
                  </button>
                  <button
                    className={`px-6 py-4 text-md font-medium flex-1 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "content"
                      ? "bg-gradient-to-r from-[#4A306D] to-[#3a2557] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    onClick={() => setActiveTab("content")}
                  >
                    <Clock className={`w-5 h-5 ${activeTab === "content" ? "text-white" : "text-[#4A306D]"}`} />
                    Nội dung khóa học
                  </button>
                  {isValidExtra && isPromoValid && (
                    <button
                      className={`relative px-6 py-4 text-md font-semibold flex-1 flex items-center justify-center gap-2 transition-all duration-300 border ${activeTab === "extra"
                        ? "bg-gradient-to-r from-[#e84e0f] to-[#d3380f] text-white shadow-lg scale-105 border-none"
                        : "bg-white text-[#e84e0f] border-[#e84e0f] hover:bg-[#fff3eb]"
                        } rounded-xl`}
                      onClick={() => setActiveTab("extra")}
                    >
                      <BookOpen
                        className={`w-5 h-5 ${activeTab === "extra" ? "text-white" : "text-[#e84e0f]"
                          }`}
                      />
                      Số bài học thử 100k
                    </button>
                  )}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {activeTab === "info" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      ref={contentRef}
                      className={`overflow-hidden transition-all duration-500 prose prose-[#4A306D] max-w-none ${isExpanded ? "max-h-full" : "max-h-[300px]"}`}
                      style={{
                        maskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 80%, transparent 100%)",
                        WebkitMaskImage: isExpanded
                          ? "none"
                          : "linear-gradient(to bottom, black 80%, transparent 100%)",
                      }}
                    >
                      <div className={styles["post__main"]}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stripEmptyP(clean(CourseData?.description || defautlHtmlCourseDetail)),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-6 py-3 text-white font-medium bg-gradient-to-r from-[#4A306D] to-[#3a2557] hover:from-[#3a2557] hover:to-[#2a1a40] rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        {isExpanded ? (
                          <>
                            Thu gọn <ChevronUp size={18} />
                          </>
                        ) : (
                          <>
                            Xem thêm <ChevronDown size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      ref={contentRef}
                      className={`overflow-hidden transition-all duration-500 prose prose-[#4A306D] max-w-none ${isExpanded ? "max-h-full" : "max-h-[700px]"}`}
                      style={{
                        maskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 80%, transparent 100%)",
                        WebkitMaskImage: isExpanded
                          ? "none"
                          : "linear-gradient(to bottom, black 80%, transparent 100%)",
                      }}
                    >
                      <div className={styles["post__main"]}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: clean(postsWp?.content?.rendered || defautlHtmlCourseDetail),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-6 py-3 text-white font-medium bg-gradient-to-r from-[#4A306D] to-[#3a2557] hover:from-[#3a2557] hover:to-[#2a1a40] rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        {isExpanded ? (
                          <>
                            Thu gọn <ChevronUp size={18} />
                          </>
                        ) : (
                          <>
                            Xem thêm <ChevronDown size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {activeTab === "extra" && isPromoValid && (

                <motion.div
                  key="extra"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    ref={contentRef}
                    className={`overflow-hidden transition-all duration-500 prose prose-[#4A306D] max-w-none ${isExpanded ? "max-h-full" : "max-h-[700px]"}`}
                    style={{
                      maskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 80%, transparent 100%)",
                      WebkitMaskImage: isExpanded ? "none" : "linear-gradient(to bottom, black 80%, transparent 100%)",
                    }}
                  >
                    <div className={styles["post__main"]}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: stripEmptyP(clean(CourseData?.descriptions_khoahoc || defautlHtmlCourseDetail)),
                        }}
                      />
                    </div>

                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-2 px-6 py-3 text-white font-medium bg-gradient-to-r from-[#4A306D] to-[#3a2557] hover:from-[#3a2557] hover:to-[#2a1a40] rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      {isExpanded ? (
                        <>
                          Thu gọn <ChevronUp size={18} />
                        </>
                      ) : (
                        <>
                          Xem thêm <ChevronDown size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/3" ref={stickyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-[#e0d6f2] ${isSticky ? "lg:sticky lg:top-[180px]" : ""
              }`}
          >
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-[#f55500] text-white font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9</span>
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <Image
                  src={CourseData?.image || "/assets/blog.jpeg"}
                  alt="Course thumbnail"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#f55500]" />
                    <span className="text-sm font-medium">{CourseData?.duration || "Thời gian học linh hoạt"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#f55500]" />
                    <span className="text-sm font-medium">{CourseData?.number_of_student || "Học viên đang học"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 leading-tight">{CourseData?.name}</h2>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                className="relative mb-8 py-4 sm:py-6"
              >
                <div className="absolute inset-0 bg-[#f55500] rounded-2xl shadow-lg"></div>
                <div className="absolute inset-0 bg-[#f55500] rounded-2xl opacity-10"></div>
                <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-[red] rounded-full animate-ping"></div>

                <div className="relative flex justify-between items-center px-3 sm:px-6 py-2">
                  <div className="flex flex-col">
                    {CourseData?.price_promo ? (
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-gray-100 line-through text-sm sm:text-lg">
                          {Number(CourseData?.price || "0").toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="relative">
                      <span className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">
                        {CourseData?.price_promo
                          ? Number(CourseData?.price_promo).toLocaleString("vi-VN")
                          : Number(CourseData?.price).toLocaleString("vi-VN")}{" "}
                        đ
                      </span>
                    </div>

                    <span className="text-white text-xs sm:text-sm font-medium">
                      {CourseData?.price_promo ? "Giá ưu đãi" : "Giá học"}
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 sm:px-4 py-1 rounded-full border-2 border-[#f55500] shadow-md">
                  <span className="text-[#4A306D] font-bold text-xs sm:text-sm whitespace-nowrap">Giá tốt nhất hôm nay</span>
                </div>
              </motion.div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 hover:bg-[#f8f5ff] rounded-xl transition-colors duration-300 border border-[#e0d6f2] shadow-sm">
                  <Clock className="w-6 h-6 text-[#4A306D] mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Thời gian</span>
                    <span className="font-medium text-gray-900">{CourseData?.duration || "Thời gian"}</span>
                  </div>
                </div>

                <div className="flex items-center p-4 hover:bg-[#f8f5ff] rounded-xl transition-colors duration-300 border border-[#e0d6f2] shadow-sm">
                  <BookOpen className="w-6 h-6 text-[#4A306D] mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Số bài học</span>
                    <span className="font-medium text-gray-900">
                      {CourseData?.number_of_lessons
                        ? Number(CourseData.number_of_lessons).toLocaleString("vi-VN") + " Bài học"
                        : "bài học"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-4 hover:bg-[#f8f5ff] rounded-xl transition-colors duration-300 border border-[#e0d6f2] shadow-sm">
                  <Users className="w-6 h-6 text-[#4A306D] mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Học viên</span>
                    <span className="font-medium text-gray-900">
                      {CourseData?.number_of_student || "Đang cập nhật"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-4 hover:bg-[#f8f5ff] rounded-xl transition-colors duration-300 border border-[#e0d6f2] shadow-sm">
                  <Award className="w-6 h-6 text-[#4A306D] mr-4 flex-shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600">Cấp chứng nhận hoàn thành</span>
                    <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#f55500] to-[#e04e00] hover:from-[#e04e00] hover:to-[#cc4700] font-bold text-lg border-none p-2 text-white h-14 transition-all duration-300 relative group overflow-hidden rounded-xl shadow-lg"
                  onClick={handleBuyNow}
                >
                  <span className="group-hover:mr-8 transition-all duration-300">
                    {CourseData?.price_promo ? "NHẬN ƯU ĐÃI 🎁" : "MUA NGAY 🛒"}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#4A306D] to-[#3a2557] hover:from-[#3a2557] hover:to-[#2a1a40] text-lg font-bold h-14 group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-white group-hover:translate-x-6 inline-block transition-transform duration-300">
                    THÊM VÀO GIỎ HÀNG
                  </span>
                </motion.button>
                {isPromoValid && isValidExtra && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNowTrial}
                    className="w-full bg-gradient-to-r from-[#ff8c00] to-[#e36c00] hover:from-[#e36c00] hover:to-[#c65a00] text-lg font-bold h-14 rounded-xl shadow-lg text-white transition-all duration-300"
                  >
                    HỌC THỬ 100K 🎓
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const defautlHtmlCourseDetail = ` 
<p className="text-gray-600">Khóa học cung cấp cho học viên những kỹ năng và kiến thức cần thiết để tạo ra những hình ảnh và đồ họa chuyên nghiệp.</p>
<p className="text-gray-600">Khóa học được thiết kế linh hoạt, cho phép học viên tự tùy chỉnh thời gian học tập phù hợp với lịch trình của mình.</p>`
