"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Banner = (banner: any) => {
  const slides = banner?.banner
    ? Object.entries(banner.banner)
        .filter(([key, value]) => value)
        .map(([key, value], index) => ({
          id: index + 1,
          bgImage: value as string
        }))
    : [
        { id: 1, bgImage: "/assets/slide-img2.webp" },
        { id: 2, bgImage: "/assets/slide-img2.webp"  }
      ];

  let swiperInstance: any = null;

  const handleNavigation = (
    e: React.MouseEvent,
    direction: "next" | "prev"
  ) => {
    e.preventDefault();

    if (!swiperInstance) return;

    if (direction === "next") {
      swiperInstance.slideNext();
    } else if (direction === "prev") {
      swiperInstance.slidePrev();
    }
  };

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination"
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        onSwiper={(swiper) => (swiperInstance = swiper)}
        className="relative"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[130px] xl:h-[750px] lg:h-[400px] md:h-[300px] overflow-hidden bg-contain md:bg-cover"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={(e) => handleNavigation(e, "prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
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
  );
};
