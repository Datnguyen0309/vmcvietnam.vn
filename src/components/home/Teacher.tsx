import { getListModel } from "@/utils/fetch-auth-odoo";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useQuery } from "react-query";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../SectionTitle";

export default function TeacherList() {
  const { data, isLoading } = useQuery(`getListTeacher`, () =>
    getListModel({
      root: "product",
      type: "list-teachers"
    })
  );
  return (
    <div className="container max-w-7xl mx-auto px-4 lg:py-8">
      <div className="text-center space-y-6 mb-12">
        <div className="flex justify-center mb-8">
          <SectionTitle title="GIÁO VIÊN" icon={<FaUser />} />
        </div>
        <h2 className="lg:text-3xl md:text-xl font-bold text-[#4A306D] text-center">
          Danh sách giáo viên
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={2}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        breakpoints={{
          640: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          },
          1280: {
            slidesPerView: 4
          }
        }}
        className="!pb-12"
      >
        {data?.data?.map((teacher: any, index: number) => (
          <SwiperSlide key={index}>
            <Link
              href={`/giao-vien/${teacher.name_to_slug}`}
              className="group block"
            >
              <div
                className={`
              overflow-hidden bg-white shadow-md 
              rounded-[6px] rounded-tl-[25px] rounded-br-[25px] 
              transition-transform duration-300 ease-in-out 
              transform hover:translate-y-[-5px] hover:opacity-90
            `}
              >
                <div className="relative w-full h-[295px] bg-gray-100 rounded-[8px] rounded-tl-[15px] rounded-br-[15px] overflow-hidden">
                  <Image
                    src={teacher?.image || "/assets/blog.jpeg"}
                    alt={teacher?.name || "Giáo viên"}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <h2 className="mt-3 text-center text-[24px] lg:font-semibold text-[#463266]">
                {teacher?.name}
              </h2>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
