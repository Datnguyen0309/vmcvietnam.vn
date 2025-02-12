"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, courses } from "@/utils/data";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";
import { getDataSetUp, getListModel } from "@/utils/fetch-auth-odoo";
import { useQuery } from "react-query";
import { CourseCard } from "../khoa-hoc/CourseCard";
import { useRouter } from "next/router";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export const HotCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
  }, [router, selectedCategory]);

  const next = () => {
    setPage((prev: number) => prev + 1);
  };
  const { data, isLoading } = useQuery("getListCate", () =>
    getDataSetUp({
      root: "product",
      type: "product-categories"
    })
  );
  console.log(selectedCategory);
  const filteredCourses =
    selectedCategory === "all"
      ? courses.slice(0, 8)
      : courses.filter((course) => course.category === selectedCategory);

  const { data: dataCourse, isLoading: isLoadingCourse } = useQuery(
    `getListCourse, ${selectedCategory}`,
    () =>
      getListModel({
        root: "product",
        type: "list-shortcourse",
        categories: selectedCategory,
        perpage: "99",
        page: "1"
      })
  );
  return (
    <div className="bg-[#fff7f5]">
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center mb-8">
            <SectionTitle title={"KHÓA HỌC"} icon={<FaUser />} />
          </div>
          <h2 className="lg:text-3xl md:text-xl font-bold text-[#4A306D]">
            Các khóa học Hot nhất 2023
          </h2>
          <Tabs defaultValue="all" className="w-fit mx-auto">
            <TabsList
              className="flex flex-wrap justify-center gap-2 bg-[#ffebe6] px-2 lg:h-[48px] h-[128px]"
              style={{
                borderRadius: "8px",
                borderTopLeftRadius: "15px",
                borderBottomRightRadius: "15px"
              }}
            >
              {data?.data.map((category: any) => (
                <TabsTrigger
                  key={category.id}
                  value={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className="text-[#555c70] text-[15px] rounded-full px-4 font-bold
                   data-[state=active]:bg-[#FF8162] data-[state=active]:text-white 
                   hover:bg-[#FF8162] hover:text-white transition-all duration-300"
                  style={{
                    borderRadius: "8px",
                    borderTopLeftRadius: "15px",
                    borderBottomRightRadius: "15px"
                  }}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!isLoadingCourse &&
            dataCourse?.data?.short_course
              ?.slice(0, page * 8)
              .map((course: any, index: number) => (
                <div key={index}>
                  <CourseCard course={course} />
                </div>
              ))}
        </div>{" "}
        {!isLoading && page * 8 < dataCourse?.data?.total_documents && (
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
      </section>
    </div>
  );
};
