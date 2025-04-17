"use client";

import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { getListModel } from "@/utils/fetch-auth-odoo";
import Head from "next/head";
import { useState } from "react";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTeachers, setVisibleTeachers] = useState(20); // Set initial visible teachers count to 20

  const { data, isLoading } = useQuery(["getListTeacher"], () =>
    getListModel({
      root: "product",
      type: "list-teachers",
    })
  );

  const filteredTeachers =
    data?.data?.filter((teacher: any) => teacher.name?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  const loadMoreTeachers = () => {
    setVisibleTeachers((prev) => prev + 20); // Load 20 more teachers each time
  };

  return (
    <>
      <Head>
        <title>Giảng Viên</title>
        <meta name="description" content="Danh sách giảng viên" />
      </Head>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 gap-4">
          <div className="flex items-center justify-center gap-2 text-[16px] text-gray-600">
            <Link href="/" className="hover:text-[#4A306D]">
              TRANG CHỦ
            </Link>
            <span>/</span>
            <span className="font-[900] text-[#222]">GIẢNG VIÊN</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm giảng viên"
              className="pl-10 pr-4 py-2 border rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#4A306D]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredTeachers.slice(0, visibleTeachers).map((teacher: any, index: number) => (
              <Link href={`/giao-vien/${teacher.name_to_slug}`} key={index} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={teacher.image || "/assets/blog.jpeg"}
                      alt={teacher.name || "Teacher"}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-sm">{teacher.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{teacher.title || "Giảng viên"}</p>
                    <p className="text-xs text-gray-400 mt-1"> {teacher.total_documents} khóa học </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredTeachers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy giảng viên phù hợp</p>
          </div>
        )}

        {filteredTeachers.length > visibleTeachers && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreTeachers}
              className="text-sm text-[#4A306D] font-medium hover:underline"
            >
              Xem Thêm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
