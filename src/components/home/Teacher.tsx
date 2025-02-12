import { courses } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../SectionTitle";
import { getListModel } from "@/utils/fetch-auth-odoo";
import { useQuery } from "react-query";

export default function TeacherList() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const { data, isLoading } = useQuery(`getListTeacher`, () =>
    getListModel({
      root: "product",
      type: "list-teachers"
    })
  );
  return (
    // <div className="container max-w-7xl mx-auto px-4 lg:py-8">
    //   <div className="text-center space-y-6 mb-12">
    //     <div className="flex justify-center mb-8">
    //       <SectionTitle title={"GIÁO VIÊN"} icon={<FaUser />} />
    //     </div>
    //     <h2 className="lg:text-3xl md:text-xl font-bold text-[#4A306D] text-center">
    //       Danh sách giáo viên
    //     </h2>
    //   </div>

    //   <Swiper
    //     modules={[Navigation, Pagination]}
    //     spaceBetween={24}
    //     slidesPerView={2}
    //     autoplay={{
    //       delay: 5000,
    //       disableOnInteraction: false
    //     }}
    //     breakpoints={{
    //       640: {
    //         slidesPerView: 2
    //       },
    //       1024: {
    //         slidesPerView: 3
    //       },
    //       1280: {
    //         slidesPerView: 4
    //       }
    //     }}
    //     className="!pb-12"
    //   >
    //     {data?.data?.map((teacher: any, index: number) => (
    //       <SwiperSlide key={index}>
    //         <Link
    //           href={`/giao-vien/${teacher.name_to_slug}`}
    //           className="group block"
    //         >
    //           <div
    //             className={`
    //               overflow-visible bg-white relative shadow-md
    //               rounded-[6px] rounded-tl-[25px] rounded-br-[25px]
    //               transition-transform duration-300 ease-in-out
    //               transform hover:translate-y-[-5px]
    //               hover:opacity-90
    //             `}
    //           >
    //             <Image
    //               src={teacher?.image || ""}
    //               alt={teacher?.name}
    //               width={400}
    //               height={400}
    //               className="object-contain h-full"
    //               style={{
    //                 borderRadius: "8px",
    //                 borderTopLeftRadius: "15px",
    //                 borderBottomRightRadius: "15px"
    //               }}
    //             />
    //           </div>
    //           <h2 className="mt-3 text-center text-[24px]  lg:font-semibold text-[#463266]">
    //             {teacher?.name}
    //           </h2>
    //         </Link>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
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
                {/* Khung ảnh được căn chỉnh theo tỷ lệ slide */}
                <div className="flex items-center justify-center w-full pt-[100%] bg-gray-100 rounded-[8px] rounded-tl-[15px] rounded-br-[15px] overflow-hidden">
                  <Image
                    src={teacher?.image || "/assets/blog.jpeg"}
                    alt={teacher?.name}
                    fill
                    className="w-full h-full object-cover"
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
