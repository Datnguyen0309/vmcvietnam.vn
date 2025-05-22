"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDataSetUp, getListModel } from "@/utils/fetch-auth-odoo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useQuery } from "react-query";
import { CourseCard, SkeletonCourseCard } from "../khoa-hoc/CourseCard";
import SectionTitle from "../SectionTitle";
import { motion } from "framer-motion";

export const HotCourses = (section_3: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const { data, isLoading } = useQuery("getListCate", () =>
    getDataSetUp({ root: "product", type: "product-categories" })
  );

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
            <SectionTitle title={section_3?.section_3?.desc || "KHÓA HỌC."} icon={<FaUser />} />
          </div>
          <h2 className="lg:text-3xl md:text-xl font-bold text-[#4A306D]">
            {section_3?.section_3?.title || " Các khóa học Hot nhất 2025."}
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
              <TabsTrigger
                key="all"
                value="all"
                style={{
                  borderRadius: "8px",
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
                onClick={() => setSelectedCategory("all")}
                className="text-[#555c70] text-[15px] rounded-full px-4 font-bold data-[state=active]:bg-[#FF8162] data-[state=active]:text-white hover:bg-[#FF8162] hover:text-white transition-all duration-300"
              >
                Tất cả
              </TabsTrigger>
              {data?.data
                ?.find((group: any) => group.group_name.trim() === "Hot")
                ?.data?.map((category: any) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    style={{
                      borderRadius: "8px",
                      borderTopLeftRadius: "15px",
                      borderBottomRightRadius: "15px"
                    }}
                    className="text-[#555c70] text-[15px] rounded-full px-4 font-bold data-[state=active]:bg-[#FF8162] data-[state=active]:text-white hover:bg-[#FF8162] hover:text-white transition-all duration-300"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}

            </TabsList>
          </Tabs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoadingCourse
            ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <SkeletonCourseCard />
              </div>
            ))
            : dataCourse?.data?.short_course
              ?.slice(0, page * 8)
              .map((course: any, index: number) => (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.05
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                </div>
              ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="relative group px-6 py-3 font-medium text-[#4a3b63] bg-white border border-[#4a3b63] rounded-lg shadow-md hover:bg-[#4a3b63] hover:text-white transition-all duration-300 focus:outline-none"
            onClick={() => router.push(`/khoa-hoc?type=${selectedCategory}`)}
          >
            <span className="absolute inset-0 flex items-center justify-center bg-[#4a3b63] bg-opacity-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Xem thêm</span>
          </button>
        </div>
      </section>
    </div>
  );
};
