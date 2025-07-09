"use client";

import { CourseCard, SkeletonCourseCard } from "@/components/khoa-hoc/CourseCard";
import { getDataSetUp } from "@/utils/fetch-auth-odoo"; // Import the getDataSetUp function
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useQuery } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../SectionTitle";

export const HotCoursesNew = () => {
    const router = useRouter();

    // Use the getDataSetUp function to fetch the new launch courses
    const { data: dataCourse, isLoading: isLoadingCourse } = useQuery(
        "getListNewLaunchCourses",
        async () => {
            const response = await getDataSetUp({
                root: "product",
                type: "list-new-launch-courses",
            });
            return response.data;
        }
    );
      const filteredCourses = dataCourse?.short_course?.filter(
    (course: any) =>
      course?.event_end_date &&
      new Date(course.event_end_date).getTime() >= Date.now()
  );

  // Nếu không có khóa học hợp lệ và không đang loading → không hiển thị section
  if (!isLoadingCourse && (!filteredCourses || filteredCourses.length === 0)) {
    return null;
  }
    return (
        <div className="bg-[#fff7f5]">
            <div className="container max-w-7xl mx-auto px-4 py-10">
                <div className="container mx-auto px-4 py-8 relative">
                    <div className="flex justify-center mb-8">
                        <SectionTitle title={"KHÓA HỌC MỚI"} icon={<FaUser />} />
                    </div>
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
                            {isLoadingCourse
                                ? Array.from({ length: 4 }).map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <SkeletonCourseCard />
                                    </SwiperSlide>
                                ))
                                : dataCourse?.short_course
                                    .filter((course: any) => {
                                        if (!course?.event_end_date) return false;
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0); // reset về 00:00
                                        const endDate = new Date(course.event_end_date);
                                        endDate.setHours(0, 0, 0, 0);
                                        return endDate >= today;
                                    })
                                    .map((course: any, index: number) => (
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
                    <div className="flex justify-center mt-8">
                        <button
                            className="relative group px-6 py-3 font-medium text-[#4a3b63] bg-white border border-[#4a3b63] rounded-lg shadow-md hover:bg-[#4a3b63] hover:text-white transition-all duration-300 focus:outline-none"
                            onClick={() => router.push(`/khoa-hoc-ra-mat`)} // Redirect to new launch courses
                        >
                            <span className="absolute inset-0 flex items-center justify-center bg-[#4a3b63] bg-opacity-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative z-10">Xem thêm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
