"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Component hiển thị ảnh có hiệu ứng skeleton
const SkeletonImage = ({ src, alt }: { src?: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div className="relative w-full h-[130px] md:h-[300px] lg:h-[400px] xl:h-[750px] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full h-[130px] md:h-[300px] lg:h-[400px] xl:h-[750px] ">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        priority
      />
    </div>
  );
};

export const Banner = (banner: any) => {
  const swiperRef = useRef<any>(null);

  if (!banner || banner.banner === undefined) {
    return (
      <div className="relative">
        <SkeletonImage alt="Đang tải banner..." />
      </div>
    );
  }

  const bannerEntries = Object.entries(banner.banner || {}).filter(
    ([_, v]) => v
  );

  const slides =
    bannerEntries.length > 0
      ? bannerEntries.map(([_, value], index) => ({
          id: index + 1,
          bgImage: value as string
        }))
      : [
          { id: 1, bgImage: "/assets/b1.jpg" },
          { id: 2, bgImage: "/assets/b2.jpg" }
        ];

  const handleNavigation = (
    e: React.MouseEvent,
    direction: "next" | "prev"
  ) => {
    e.preventDefault();
    if (!swiperRef.current) return;
    direction === "next"
      ? swiperRef.current.slideNext()
      : swiperRef.current.slidePrev();
  };

  return (
    <section className="w-full max-w-[1920px] mx-auto">
        <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="relative py"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SkeletonImage src={slide.bgImage} alt={`Banner ${slide.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={(e) => handleNavigation(e, "prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={(e) => handleNavigation(e, "next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10" />
    </div>
    </section>
  );
};
