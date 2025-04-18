"use client"

import { useQuery } from "react-query"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, BookOpen } from "lucide-react"
import { getListModel } from "@/utils/fetch-auth-odoo"
import Head from "next/head"
import { useState, useEffect, useMemo, useCallback } from "react"

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleTeachers, setVisibleTeachers] = useState(20)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const { data, isLoading } = useQuery(["getListTeacher"], () =>
    getListModel({
      root: "product",
      type: "list-teachers",
    }),
  )

  const filteredTeachers = useMemo(() => {
    return data?.data?.filter((teacher: any) => teacher.name?.toLowerCase().includes(searchTerm.toLowerCase())) || []
  }, [data, searchTerm])

  const loadMoreTeachers = () => {
    setVisibleTeachers((prev) => prev + 20)
  }

  // Setup intersection observer
  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Target all teacher cards, including newly loaded ones
    const hiddenElements = document.querySelectorAll(".teacher-card:not(.show)")
    hiddenElements.forEach((el) => observer.observe(el))

    return observer
  }, [])

  // Initial setup and when visible teachers change
  useEffect(() => {
    // Small timeout to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      const observer = setupObserver()

      return () => {
        observer.disconnect()
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [setupObserver, visibleTeachers, filteredTeachers])

  return (
    <>
      <Head>
        <title>Giảng Viên | Khám phá đội ngũ giảng viên xuất sắc</title>
        <meta
          name="description"
          content="Khám phá đội ngũ giảng viên xuất sắc với nhiều năm kinh nghiệm trong lĩnh vực giảng dạy"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">

        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb and search */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-12 gap-4">
            <div className="flex items-center justify-center gap-2 text-[16px] text-gray-600">
              <Link href="/" className="hover:text-[#4A306D] transition-colors duration-200">
                TRANG CHỦ
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-[#4A306D]">GIẢNG VIÊN</span>
            </div>
            <div className="relative w-full md:w-auto">
              <div
                className={`relative transition-all duration-300 ${isSearchFocused ? "ring-2 ring-[#4A306D] ring-opacity-50" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm giảng viên..."
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm w-full md:w-72 focus:outline-none shadow-sm transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${isSearchFocused ? "text-[#4A306D]" : "text-gray-400"}`}
                >
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Teachers grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {[...Array(20)].map((_, index) => (
                <div key={index} className="animate-pulse rounded-xl overflow-hidden shadow-sm bg-white">
                  <div className="bg-gray-200 aspect-square"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-2/3 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto">
                    <div className="text-[#4A306D] mb-4 flex justify-center">
                      <Search className="w-16 h-16 opacity-30" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy giảng viên</h3>
                    <p className="text-gray-500">
                      Không tìm thấy giảng viên phù hợp với từ khóa &ldquo;{searchTerm}&rdquo;. Vui lòng thử lại với từ
                      khóa khác.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                  {filteredTeachers.slice(0, visibleTeachers).map((teacher: any, index: number) => (
                    <Link href={`/giao-vien/${teacher.name_to_slug}`} key={index} className="group">
                      <div className="teacher-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-4">
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={teacher.image || "/assets/blog.jpeg"}
                            alt={teacher.name || "Teacher"}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#4A306D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="text-white p-4 text-center w-full">
                              <span className="text-sm font-medium">Xem chi tiết</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-semibold text-gray-800 group-hover:text-[#4A306D] transition-colors duration-300">
                            {teacher.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{teacher.title || "Giảng viên"}</p>
                          <div className="flex items-center justify-center mt-2 text-xs text-gray-400 gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{teacher.total_documents} khóa học</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {filteredTeachers.length > visibleTeachers && (
                <div className="text-center mt-8 mb-16">
                  <button
                    onClick={loadMoreTeachers}
                    className="px-6 py-3 bg-white text-[#4A306D] border border-[#4A306D] rounded-full font-medium hover:bg-[#4A306D] hover:text-white transition-colors duration-300 shadow-sm flex items-center gap-2 mx-auto"
                  >
                    <span>Xem Thêm Giảng Viên</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .teacher-card {
          transition: all 0.5s ease;
        }
        .teacher-card.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Ensure hover effects work regardless of animation state */
        .teacher-card:hover .absolute {
          opacity: 1 !important;
        }
        
        .group:hover .teacher-card {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .group:hover .group-hover\:scale-105 {
          transform: scale(1.05);
        }
        
        .group:hover .group-hover\:opacity-100 {
          opacity: 1;
        }
        
        .group:hover .group-hover\:text-\[\#4A306D\] {
          color: #4A306D;
        }
      `}</style>
    </>
  )
}
