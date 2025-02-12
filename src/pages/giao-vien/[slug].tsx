import { CourseCard } from "@/components/khoa-hoc/CourseCard";
import Layout from "@/components/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getListModel } from "@/utils/fetch-auth-odoo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const TeacherProfile = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
  }, [router]);

  const next = () => {
    setPage((prev: number) => prev + 1);
  };

  const { slug } = router.query as { slug: string };
  const { data, isLoading } = useQuery(`getKhoahocbyTeacher, ${slug}`, () =>
    getListModel({
      root: "product",
      type: "list-shortcourse",
      teacher: slug,
      perpage: "99",
      page: "1"
    })
  );

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 gap-4">
          <div className="flex items-center justify-center gap-2 text-[16px] text-gray-600">
            <Link href="/" className="hover:text-[#4A306D]">
              TRANG CHỦ
            </Link>
            <span>/</span>
            <span className="font-[900] text-[#222]">GIÁO VIÊN</span>
            <span>/</span>
            <span className="font-[900] text-[#222] uppercase">
              {data?.data?.short_course[0]?.teacher?.name}
            </span>
          </div>

          <div className="w-full md:w-[180px] flex justify-center">
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Thứ tự mặc định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Thứ tự mặc định</SelectItem>
                <SelectItem value="popularity">
                  Thứ tự theo mức độ phổ biến
                </SelectItem>
                <SelectItem value="rating">
                  Thứ tự theo điểm đánh giá
                </SelectItem>
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
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <div className="relative">
            <div className={` rounded-lg overflow-hidden`}>
              <Image
                src={data?.data?.short_course[0]?.teacher?.image || "/assets/blog.jpeg"}
                alt={data?.data?.short_course[0]?.teacher?.name}
                width={300}
                height={400}
                className="w-full h-auto"
                style={{
                  borderRadius: "8px",
                  borderTopLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                }}
              />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#0f0f0f]">
              {data?.data?.short_course[0]?.teacher?.name}
            </h1>
            <div className="prose prose-gray max-w-none">
              <p>{data?.data?.short_course[0]?.teacher?.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-[25px] font-[700] text-[#4A306D] mb-6  uppercase">
            DANH SÁCH CÁC KHÓA HỌC CỦA{" "}
            {data?.data?.short_course[0]?.teacher?.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {data?.data?.short_course
              ?.slice(0, page * 8)
              .map((course: any, index: number) => (
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
      </div>
    </Layout>
  );
};

export default TeacherProfile;
