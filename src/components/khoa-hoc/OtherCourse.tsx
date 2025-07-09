import { getDataSetUp, getListModel } from "@/utils/fetch-auth-odoo";
import { useQuery } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseCard } from "./CourseCard";

export const OtherCourse = ({ CourseData }: { CourseData: any }) => {
  const hasPromo = CourseData?.event_end_date;

  const queryFn = hasPromo
    ? () =>
      getDataSetUp({
        root: "product",
        type: "list-new-launch-courses",
      })
    : () =>
      getListModel({
        root: "product",
        type: "list-shortcourse",
        categories: CourseData?.category_slug,
        perpage: "8",
        page: "1",
      });

  const { data, isLoading } = useQuery(
    [`getCoursesRelated`, CourseData?.category_slug, hasPromo],
    queryFn
  );

const now = Date.now();
const courseList = data?.data?.short_course
  ?.filter((course: any) => course?.id !== CourseData?.id)
  ?.filter((course: any) => {
    if (!hasPromo) return true;
    if (!course?.event_end_date) return false;
    return new Date(course.event_end_date).getTime() >= now;
  });


  if (!courseList || courseList.length === 0) return null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="container mx-auto px-4 py-8 relative">
        <h2 className="text-2xl font-bold text-[#4A306D] mb-6">
          {hasPromo ? "CÁC KHÓA HỌC RA MẮT " : "CÁC KHÓA HỌC KHÁC"}
        </h2>
        <div className="relative group">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="relative"
          >
            {courseList.map((course: any, index: number) => (
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
