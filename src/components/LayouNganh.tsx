"use client";

import { getListModel, getDataSetUp } from "@/utils/fetch-auth-odoo";
import { toSlug } from "@/utils/toSlug";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useQuery } from "react-query";
import { CourseCard, SkeletonCourseCard } from "./khoa-hoc/CourseCard";

interface LayoutNganhProps {
  category: string;
  titles: string;
}

const fetchAllCourses = async (category: string, isNewLaunchPage: boolean) => {
  let allCourses: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await getListModel({
      root: "product",
      type: isNewLaunchPage ? "list-new-launch-courses" : "list-shortcourse",
      categories: category,
      perpage: "99",
      page: String(page),
    });

    const courses = res?.data?.short_course || [];
    allCourses = [...allCourses, ...courses];
    hasMore = !res?.data?.is_last_page; // dùng cờ phân trang từ backend
    page++;
  }

  return allCourses;
};


export const LayoutNganh = ({ category }: LayoutNganhProps) => {
  const [inputKey, setInputKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const keyWord = decodeURIComponent((router.query.key as string) || "");
  const isNewLaunchPage = router.pathname.includes("khoa-hoc-ra-mat");

  const { data: allCourses, isLoading } = useQuery(
    ["allCourses", category, isNewLaunchPage],
    () => fetchAllCourses(category, isNewLaunchPage),
    { keepPreviousData: true }
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [category, keyWord]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: Record<string, any> = { ...router.query };
    if (inputKey.trim()) {
      query.key = encodeURIComponent(inputKey.trim());
    } else {
      delete query.key;
    }
    router.push({ pathname: router.pathname, query });
  };

  const filterByKeyword = (list: { name: string }[], keyword: string) => {
    const normalizedKeywordWords = toSlug({ type: "signed", input: keyword }).split(/\s+/);
    return list.filter((item) => {
      const normalizedNameWords = toSlug({ type: "signed", input: item.name }).split(/\W+/);
      return normalizedKeywordWords.every((word) =>
        normalizedNameWords.some((nameWord) => nameWord.includes(word))
      );
    });
  };

  const filtered = (allCourses || []).filter((course: any) => {
    const isValidStart = !isNewLaunchPage || course.event_start_date;
    return isValidStart;
  });

  const filteredCourses = filterByKeyword(filtered, keyWord);

  const pageSize = 16;
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2 text-[18px] text-gray-600">
          <Link href="/" className="hover:text-[#4A306D]">TRANG CHỦ</Link>
          <span>/</span>
          <Link
            href={isNewLaunchPage ? "/khoa-hoc-ra-mat" : "/khoa-hoc"}
            className="font-[900] text-[#222]"
          >
            {isNewLaunchPage
              ? "KHÓA HỌC RA MẮT"
              : category !== "all"
                ? allCourses?.[0]?.category?.toUpperCase()
                : "Tất cả khóa học"}
          </Link>
        </div>
        <div className="w-full md:w-[360px] grid grid-cols-2">
          <form
            className="flex border border-gray-300 bg-white w-full rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md focus-within:shadow-md focus-within:border-[#4A306D]"
            onSubmit={handleSearch}
          >
            <input
              placeholder="Tìm khóa học..."
              onChange={(e) => setInputKey(e.target.value)}
              value={inputKey}
              className="flex-1 px-4 py-3 outline-none bg-transparent text-[16px] placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 bg-[#4A306D] text-white hover:bg-[#5d3d87] transition-colors flex items-center justify-center"
            >
              <IoSearchSharp className="h-5 w-5" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 text-[18px] text-gray-600">
            <p>Có {filteredCourses?.length || 0} khóa học</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div key={idx}><SkeletonCourseCard /></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCourses.map((course: any, index: number) => (
              <div key={index}><CourseCard course={course} /></div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 overflow-x-auto">
              <div className="flex whitespace-nowrap justify-center items-center gap-2 px-2 min-w-fit w-full">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded border text-[#4a3b63] hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </button>
                {generatePageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    disabled={page === "..."}
                    className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded border transition-all ${currentPage === page
                      ? "bg-[#4a3b63] text-white border-[#4a3b63]"
                      : "bg-white text-[#4a3b63] hover:bg-gray-100 border-gray-300"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded border text-[#4a3b63] hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
