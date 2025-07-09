"use client"

import { useQuery } from "react-query"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Sparkles } from "lucide-react"
import { getListModel } from "@/utils/fetch-auth-odoo"
import { useEffect, useMemo, useState, useCallback } from "react"

interface Props {
  group: string // group_name để lọc
  searchTerm?: string
}

export default function TeacherGroupSection({ group, searchTerm = "" }: Props) {
  const [visibleTeachers, setVisibleTeachers] = useState(20)

  const { data, isLoading } = useQuery(["getListTeacher"], () =>
    getListModel({
      root: "product",
      type: "list-teachers",
    }),
  )

  const filteredTeachers = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return []

    const groupData = data.data.find((g: any) => g?.group_name === group)

    if (!groupData || !Array.isArray(groupData.teachers)) return []

    return groupData.teachers.filter((teacher: any) => teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [data, group, searchTerm])

  const loadMoreTeachers = () => setVisibleTeachers((prev) => prev + 20)

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

    const hiddenElements = document.querySelectorAll(".teacher-card:not(.show)")
    hiddenElements.forEach((el) => observer.observe(el))

    return observer
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const observer = setupObserver()
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [setupObserver, visibleTeachers, filteredTeachers])

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-10 ">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl shadow-md p-4 overflow-hidden">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-4">
            <Sparkles className="w-8 h-8 text-[#4A306D]" />
          </div>
          <p className="text-xl font-medium text-gray-700">Không có giảng viên trong nhóm {`"${group}"`}</p>
          <p className="text-gray-500 mt-2">Vui lòng thử tìm kiếm với từ khóa khác</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTeachers.slice(0, visibleTeachers).map((teacher: any, index: number) => (
              <Link href={`/giao-vien/${teacher.name_to_slug}`} key={index} className="group">
                <div
                  className="teacher-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 translate-y-4"
                  style={{
                    transitionDelay: `${(index % 20) * 50}ms`,
                    boxShadow: "0 4px 20px rgba(74, 48, 109, 0.05)",
                  }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={teacher.image || "/assets/blog.jpeg"}
                      alt={teacher.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A306D]/90 via-[#4A306D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
                      <div className="text-white p-4 text-center w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-flex items-center text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Xem chi tiết
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#4A306D] transition-colors duration-300 line-clamp-1">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{teacher.title || "Giảng viên"}</p>
                    <div className="flex items-center justify-center mt-2 text-xs text-gray-400 gap-1 group-hover:text-[#4A306D]/70 transition-colors duration-300">
                      <BookOpen className="w-3 h-3" />
                      <span>{teacher.total_documents} khóa học</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredTeachers.length > visibleTeachers && (
            <div className="text-center mt-10">
              <button
                onClick={loadMoreTeachers}
                className="px-8 py-3 bg-white text-[#4A306D] border border-[#4A306D] rounded-full font-medium hover:bg-[#4A306D] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Xem thêm giảng viên
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
