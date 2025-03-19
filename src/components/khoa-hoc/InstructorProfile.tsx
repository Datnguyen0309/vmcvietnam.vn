"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { clean } from "../lib/sanitizeHtml";
import { Loading } from "../Loading";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export const InstructorProfile = ({ teacher_info }: { teacher_info: any }) => {
  if (!teacher_info) {
      return (
        <Loading/>
      );
    }
  return (
    <>
      <div className="bg-[#fff7f5] py-8 w-full">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#4A306D] mb-6">
            THÔNG TIN GIẢNG VIÊN
          </h2>

          <Card className="border-none bg-transparent">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className=" md:w-48 h-48 relative">
                  <Image
                    src={teacher_info?.image || ""}
                    alt={teacher_info?.name || ""}
                    width={192}
                    height={192}
                    className="rounded-lg object-cover"
                    style={{
                      borderRadius: "6px",
                      borderTopLeftRadius: "34px",
                      borderBottomRightRadius: "34px",
                      objectFit: "cover",
                      height:"192px",
                    }}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold text-[#4A306D]">
                    {teacher_info?.name}
                  </h3>
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: clean(
                        teacher_info?.description || "Mô tả giáo viên"
                      )
                    }}
                  />
                  {teacher_info && (
                    <Link
                      key={teacher_info?.id}
                      href={`/giao-vien/${teacher_info?.name_to_slug}`}
                      className="flex items-center text-orange-500 hover:underline"
                    >
                      Xem thêm <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      ;
    </>
  );
};
