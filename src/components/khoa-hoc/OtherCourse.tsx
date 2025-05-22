import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseCard } from "./CourseCard";
import { getListModel } from "@/utils/fetch-auth-odoo";
import { useQuery } from "react-query";
export const OtherCourse = ({ CourseData }: { CourseData: any }) => {
  const { data, isLoading } = useQuery(
    `getOtherCourse, ${CourseData?.category_slug}`,
    () =>
      getListModel({
        root: "product",
        type: "list-shortcourse",
        categories: CourseData?.category_slug,
        perpage: "8",
        page: "1"
      })
  );
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="container mx-auto px-4 py-8 relative">
        <h2 className="text-2xl font-bold text-[#4A306D] mb-6">
          CÁC KHÓA HỌC KHÁC
        </h2>
        <div className="relative group">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev"
            }}
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
            className="relative"
          >
            {data?.data?.short_course?.map((course: any, index: number) => (
              <SwiperSlide key={index}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="custom-prev lg:h-full absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ffffffcc] text-black p-2 z-10 
  opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-[#fff] transition-all duration-300 border-none"
            aria-label="Previous"
          >
            &#x276E;
          </button>
          <button
            className="custom-next lg:h-full absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ffffffcc] text-black p-2 z-10 
  opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-[#fff] transition-all duration-300 border-none"
            aria-label="Next"
          >
            &#x276F;
          </button>
        </div>
      </div>
    </div>
  );
};
