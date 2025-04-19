"use client"

import { getListModel } from "@/utils/fetch-auth-odoo"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { FaUser } from "react-icons/fa"
import { useQuery } from "react-query"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import SectionTitle from "../SectionTitle"

export default function TeacherList(section_5:any) {
  const swiperRef = useRef(null)
  const { data, isLoading } = useQuery("getListTeacher", () =>
    getListModel({
      root: "product",
      type: "list-teachers",
    }),
  )

  // ✅ Lọc nhóm "teacher-home"
  const teacherGroup = data?.data?.find((group: any) => group.group_name === "teacher-home")
  const teachers = teacherGroup?.teachers || []

  return (
    <div className="relative bg-gradient-to-b from-[#f9f7ff] to-white py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#4A306D]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#4A306D]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container max-w-7xl mx-auto px-4 lg:py-8 relative">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-8">
            <SectionTitle title= {section_5?.section_5?.desc ||"GIÁO VIÊN."} icon={<FaUser />} />
          </div>
          <h2 className="lg:text-4xl md:text-2xl text-xl font-bold text-[#4A306D] text-center relative inline-block">
          {section_5?.section_5?.title || "Đội ngũ giáo viên xuất sắc."}
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#8A63C8] to-[#4A306D]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4  whitespace-pre">
          {section_5?.section_5?.desc_1 || "Đội ngũ giáo viên giàu kinh nghiệm, tận tâm và chuyên nghiệp của chúng tôi."}
          </p>
        </div>

        <div className="relative px-4">

          <Swiper
            onSwiper={(swiper) => {
              ;(swiperRef as any).current = swiper
            }}
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active bg-[#4A306D]",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!pb-16"
          >
            {isLoading
              ? // Loading skeleton
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                      <div className="animate-pulse">
                        <div className="bg-gray-200 h-[295px] rounded-[8px] rounded-tl-[25px] rounded-br-[25px]"></div>
                        <div className="h-6 bg-gray-200 rounded mt-4 mx-auto w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mt-2 mx-auto w-1/2"></div>
                      </div>
                    </SwiperSlide>
                  ))
              : teachers.map((teacher: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Link href={`/giao-vien/${teacher.name_to_slug}`} className="group block">
                      <div className="relative">
                        {/* Gold accent corner */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#f0d68a] to-[#d4af37] rounded-tl-[25px] z-0 opacity-80"></div>

                        <div className="relative overflow-hidden bg-white rounded-[8px] rounded-tl-[25px] rounded-br-[25px] transition-all duration-500 ease-in-out transform group-hover:translate-y-[-8px] z-10 border border-gray-100">
                          {/* Card shadow with layered effect */}
                          <div className="absolute inset-0 shadow-[0_10px_30px_-15px_rgba(74,48,109,0.3)] group-hover:shadow-[0_20px_40px_-20px_rgba(74,48,109,0.4)] transition-all duration-500"></div>

                          <div className="relative w-full h-[295px] bg-gray-100 overflow-hidden">
                            <Image
                              src={teacher?.image || "/assets/blog.jpeg"}
                              alt={teacher?.name || "Giáo viên"}
                              fill
                              className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />

                            {/* Elegant overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4A306D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                              <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-sm font-light">Xem chi tiết</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white relative">
                            {/* Decorative line */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#f0d68a] to-[#d4af37]"></div>

                            <h2 className="mt-2 text-center text-xl font-semibold text-[#463266] group-hover:text-[#8A63C8] transition-colors duration-300">
                              {teacher?.name}
                            </h2>

                            <p className="text-center text-gray-500 text-sm mt-1">
                              {teacher?.position || "Giáo viên chuyên nghiệp"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        {/* Decorative bottom element */}
        <div className="flex justify-center mt-8">
          <Link
            href="/giao-vien"
            className="inline-flex items-center px-6 py-2 border border-[#4A306D] text-[#4A306D] rounded-full hover:bg-[#4A306D] hover:text-white transition-all duration-300 group"
          >
            <span>Xem tất cả giáo viên</span>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
