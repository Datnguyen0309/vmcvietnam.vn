"use client"

import TeacherGroupSection from "@/components/teachers/TeacherGroupSection"
import { ChevronRight } from "lucide-react"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <>
      <Head>
        <title>Giảng Viên | Khám phá đội ngũ giảng viên xuất sắc</title>
        <meta
          name="description"
          content="Khám phá đội ngũ giảng viên xuất sắc với nhiều năm kinh nghiệm trong lĩnh vực giảng dạy"
        />
      </Head>
      <div className="max-w-7xl mx-auto p-4 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between  gap-4">
          <div className="flex items-center justify-center gap-2 text-[16px] text-gray-600">
            <Link href="/" className="hover:text-[#4A306D] transition-colors duration-200">
              TRANG CHỦ
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-bold text-[#4A306D]">GIẢNG VIÊN</span>
          </div>
          <div className="relative w-full md:w-auto">
            <div
              className={`relative transition-all duration-300 "ring-2 ring-[#4A306D] ring-opacity-50" : ""}`}
            >
              <input
                type="text"
                placeholder="Tìm kiếm giảng viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#4A306D]"
              />
              </div>
            </div>
          </div>
        </div>
        <TeacherGroupSection group="All" searchTerm={searchTerm} />
    </>
  )
}
