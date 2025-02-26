"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { courses } from "@/utils/data";
import { getListModel } from "@/utils/fetch-auth-odoo";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CourseCard } from "./khoa-hoc/CourseCard";
import { toSlug } from "@/utils/toSlug";
import { IoSearchSharp } from "react-icons/io5";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

interface LayoutNganhProps {
  category: string;
  titles: string;
}

export const LayoutNganh = ({ category, titles }: LayoutNganhProps) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [inputKey, setInputKey] = useState("");

  useEffect(() => {
    setPage(1);
  }, [router, category]);
  const next = () => {
    setPage((prev: number) => prev + 1);
  };
  const { data, isLoading } = useQuery(`getKhoahocbycate, ${category}`, () =>
    getListModel({
      root: "product",
      type: "list-shortcourse",
      categories: category,
      perpage: "99",
      page: "1"
    })
  );
  const keyWord = decodeURIComponent((router?.query?.key as string) || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn reload
    const query = { ...router.query }; // Sao chép query hiện tại
    if (inputKey.trim()) {
      query.key = encodeURIComponent(inputKey.trim()); // Thêm từ khóa
    } else {
      delete query.key; // Xóa nếu trống
    }

    router.push({ pathname: router.pathname, query });
  };

  const filterByKeyword = (list: { name: string }[], keyword: string) => {
    const normalizedKeywordWords = toSlug({ type: "signed", input: keyword }).split(/\s+/); // Tách từ khóa thành mảng từ

    return list.filter((item) => {
      const normalizedNameWords = toSlug({ type: "signed", input: item.name }).split(/\W+/); // Tách `name` thành mảng từ

      // Kiểm tra nếu tất cả các từ trong keyword đều xuất hiện trong `name`
      return normalizedKeywordWords.every((word) =>
        normalizedNameWords.some((nameWord) => nameWord.includes(word))
      );
    });
  };
  const result = filterByKeyword(data?.data?.short_course || [], keyWord);
  const pageQuery = Number((router?.query?.page as string) || "1");

  return (
    <div className="container max-w-7xl mx-auto px-4 py-20">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2 text-[18px] text-gray-600">
          <Link href="/" className="hover:text-[#4A306D]">
            TRANG CHỦ
          </Link>
          <span>/</span>
          <span className="font-[900] text-[#222]">
            {category != "all"
              ? data?.data?.short_course[0]?.category.toUpperCase()
              : "Tất cả khóa học"}
          </span>
        </div>

        <div className="w-full md:w-[360px] grid grid-cols-2 ">
        <div className="flex items-center justify-center gap-2 text-[18px] text-gray-600">
            <p>Có {data?.data?.total_documents || 10} khóa học</p>
          </div>
          <Select defaultValue="default">
            <SelectTrigger>
              <SelectValue placeholder="Thứ tự mặc định" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Thứ tự mặc định</SelectItem>
              <SelectItem value="popularity">
                Thứ tự theo mức độ phổ biến
              </SelectItem>
              <SelectItem value="rating">Thứ tự theo điểm đánh giá</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="price-asc">
                Thứ tự theo giá: thấp đến cao
              </SelectItem>
              <SelectItem value="price-desc">
                Thứ tự theo giá: cao xuống thấp
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mx-auto max-w-[1320px] py-8 hidden">
          <div className="grid gap-6 xl:grid-cols-[1fr_310px] mx-[10px] xl:mx-0">
            <div className="flex text-[20px] justify-between items-center text-Dusky-Lavender">
              <p>
                <span className=" font-semibold text-Blush-Pink text-[16x] pr-2">
                  {result?.length || "0"}
                </span>
                Khóa học
              </p>
              {/* {keyWord != "" && (
                <p>
                  Từ khóa:
                  <span className=" font-semibold text-Blush-Pink text-[24px]">
                    {" "}
                    {keyWord || "0"}
                  </span>
                </p>
              )} */}
            </div>
            <div className=" flex justify-between items-center text-[14px] ">
              <div className="flex border border-Cloud-Gray bg-white w-full rounded-[5px] items-center ">
                <form className="flex items-center" action="" onSubmit={handleSearch}>
                  <button type="submit" className=" text-Blush-Pink rounded-r-[5px] py-[15px] pl-3">
                    <IoSearchSharp className="h-5 w-5 font-bold" />
                  </button>
                  <input
                    placeholder="Tìm khóa học"
                    onChange={(e) => {
                      setInputKey(e.target.value);
                    }}
                    value={inputKey}
                    className="flex-1 text-Dusky-Lavender bg-transparent text-[18px] py-[6px] px-2 rounded-md focus:outline-none "
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {result?.slice((pageQuery - 1) * 9, pageQuery * 9).map((course: any, index: number) => (
          <div key={index}>
          <CourseCard course={course} />
        </div>
        ))}
      </div>
      {!isLoading && page * 8 < data?.data?.total_documents && (
        <div className="py-12 flex justify-center items-center">
          <button
            className="relative group px-6 py-3 font-medium text-[#4a3b63] bg-white border border-[#4a3b63] rounded-lg shadow-md hover:bg-[#4a3b63] hover:text-white transition-all duration-300 focus:outline-none"
            onClick={() => {
              next && next();
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center bg-[#4a3b63] bg-opacity-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Xem thêm</span>
          </button>
        </div>
      )}
    </div>
  );
};
