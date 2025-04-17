"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { getListModel } from "@/utils/fetch-auth-odoo"; // Using your existing import path
import Head from "next/head";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

interface Teacher {
  id: number;
  name: string;
  image: string;
  name_to_slug: string;
  description: string;
  course_count: number;
}

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm
  const [teachersWithCourses, setTeachersWithCourses] = useState<Teacher[]>([]); // Giảng viên với thông tin khóa học
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]); // Giảng viên đã lọc theo từ khóa
  const [isLoading, setIsLoading] = useState(true); // Tự khai báo trạng thái loading
  const [noData, setNoData] = useState(false); // Trạng thái không có dữ liệu
  const [visibleTeachers, setVisibleTeachers] = useState<Teacher[]>([]); // Giảng viên đã hiển thị
  const [page, setPage] = useState(1); // Trạng thái trang hiện tại
  const [maxPage, setMaxPage] = useState(0); // Trang cuối cùng có dữ liệu

  // Hàm debounce để giảm số lượng lần gọi API khi tìm kiếm
  const debouncedSearch = debounce(async (term: string) => {
    setSearchTerm(term); // Cập nhật searchTerm sau khi debounce

    // Khi tìm kiếm thay đổi, reset danh sách giảng viên hiển thị
    setVisibleTeachers([]);
    setPage(1); // Reset trang về 1 khi thay đổi tìm kiếm
    await fetchTeachers(term); // Gọi lại API với tìm kiếm mới và trang 1
  }, 500); // Delay 500ms để tránh gọi API liên tục

  // Hàm để lấy tất cả giảng viên từ API và thông tin khóa học
  const fetchTeachers = async (term: string) => {
    setIsLoading(true); // Bắt đầu loading

    const response = await getListModel({
      root: "product",
      type: "list-teachers",
      perpage: "100", // Lấy tất cả giảng viên (hoặc số lượng tối đa mà bạn cần)
    });

    if (response?.data) {
      const filtered = response?.data?.filter((teacher: any) =>
        teacher.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTeachers(filtered); // Lưu giảng viên đã lọc

      if (filtered.length === 0) {
        setNoData(true); // Nếu không có dữ liệu giảng viên
      } else {
        setNoData(false); // Nếu có dữ liệu
      }

      // Lấy thêm thông tin khóa học cho tất cả giảng viên đã lọc
      await fetchCourseCounts(filtered);
    }

    setIsLoading(false); // Đặt lại trạng thái loading khi dữ liệu đã tải xong
  };

  // Hàm lấy số lượng khóa học của từng giảng viên
  const fetchCourseCounts = async (teachers: Teacher[]) => {
    const teachersData = await Promise.all(
      teachers.map(async (teacher: any) => {
        const courseData = await getListModel({
          root: "product",
          type: "list-shortcourse",
          teacher: teacher.name_to_slug,
          perpage: "1",
          page: "1",
        });

        return {
          ...teacher,
          course_count: courseData?.data?.total_documents || 0,
        };
      })
    );

    setTeachersWithCourses(teachersData); // Cập nhật giảng viên với số khóa học
    setMaxPage(Math.ceil(teachersData.length / 20)); // Tính số trang cần thiết (20 giảng viên mỗi trang)
    setVisibleTeachers(teachersData.slice(0, 20)); // Hiển thị 20 giảng viên đầu tiên
  };

  useEffect(() => {
    fetchTeachers(searchTerm); // Gọi API khi component mount lần đầu
  }, []); // Chỉ gọi lần đầu tiên khi component được mount

  // Mỗi khi số giảng viên đã lọc thay đổi, gọi hàm lấy thông tin khóa học
  useEffect(() => {
    if (filteredTeachers.length > 0) {
      fetchCourseCounts(filteredTeachers);
    }
  }, [filteredTeachers]);

  // Hàm "Xem thêm"
  const handleLoadMore = () => {
    const nextTeachers = filteredTeachers.slice(visibleTeachers.length, visibleTeachers.length + 20); // Lấy 20 giảng viên tiếp theo
    setVisibleTeachers((prevTeachers) => [...prevTeachers, ...nextTeachers]); // Nối giảng viên mới vào danh sách đã hiển thị
    setPage(page + 1); // Tăng số trang
  };

  // Hàm "Quay lại"
  const handleGoBack = () => {
    const prevTeachers = visibleTeachers.slice(0, visibleTeachers.length - 20); // Lấy giảng viên đã hiển thị trước đó
    setVisibleTeachers(prevTeachers); // Cập nhật lại danh sách giảng viên hiển thị
    setPage(page - 1); // Giảm số trang
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
              onChange={(e) => debouncedSearch(e.target.value)} // Gọi hàm debounce
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teachersWithCourses.length > 0 ? (
              visibleTeachers.map((teacher: any, index: number) => (
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
                      <p className="text-xs text-gray-400 mt-1">Số khóa học: {teacher.course_count}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Hiển thị khi không có giảng viên
              noData && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Không có giảng viên nào</p>
                </div>
              )
            )}
          </div>
        )}

        {/* Nút "Xem thêm" */}
        {page < maxPage && !isLoading && teachersWithCourses.length > 0 && (
          <div className="text-center py-4">
            <button
              onClick={handleLoadMore}
              className="bg-[#4A306D] text-white px-6 py-2 rounded-full"
            >
              Xem thêm
            </button>
          </div>
        )}

        {/* Nút "Quay lại" */}
        {page > 1 && !isLoading && teachersWithCourses.length > 0 && (
          <div className="text-center py-4">
            <button
              onClick={handleGoBack}
              className="bg-[#4A306D] text-white px-6 py-2 rounded-full"
            >
              Quay lại
            </button>
          </div>
        )}
      </div>
    </>
  );
}
