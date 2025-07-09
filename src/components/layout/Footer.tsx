"use client";

import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Footer = () => {
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getHomeContent();
  }, []);

  const renderList2 = () => {
    if (!homeContent) {
      return Array(4)
        .fill(null)
        .map((_, i) => <Skeleton key={i} width={160} height={20} />);
    }
    return homeContent?.acf?.footer?.list_2?.group?.map(
      (item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <Link href={item.url || "#"} target="_blank" rel="noopener noreferrer">
            {item.title || "Mặc định tên"}
          </Link>
        </div>
      )
    );
  };

  const renderList3 = () => {
    if (!homeContent) {
      return Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="py-2">
            <Skeleton width={180} height={20} />
          </div>
        ));
    }
    return homeContent?.acf?.footer?.list_3?.group?.map(
      (item: any, index: number) => (
        <div key={index} className="flex items-center gap-2 py-2">
          <Link href={item.url || "#"} target="_blank" rel="noopener noreferrer">
            {item.title || "Mặc định tên"}
          </Link>
        </div>
      )
    );
  };

  return (
    <>
      <footer
        className="bg-[#4A306D] text-white bg-cover bg-center py-10"
        style={{
          backgroundImage:
            "url('https://webkhoahoc.giaodienwebmau.com/wp-content/uploads/2023/08/wavy.webp')",
        }}
      >
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cột 1 */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {homeContent ? homeContent?.acf?.footer?.list_1?.text_1 : <Skeleton width={180} />}
              </h2>
              <div className="space-y-3 text-white">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p className="text-white">
                    {homeContent ? homeContent?.acf?.footer?.list_1?.text_2 : <Skeleton count={2} />}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {homeContent ? (
                    <Link href={homeContent?.acf?.footer?.list_1?.text_3 || "#"}>
                      {homeContent?.acf?.footer?.list_1?.text_4}
                    </Link>
                  ) : (
                    <Skeleton width={120} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {homeContent ? (
                    <Link href={homeContent?.acf?.footer?.list_1?.text_5 || "#"}>
                      {homeContent?.acf?.footer?.list_1?.text_6}
                    </Link>
                  ) : (
                    <Skeleton width={180} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {homeContent ? (
                    <Link
                      href={homeContent?.acf?.footer?.list_1?.text_7 || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {homeContent?.acf?.footer?.list_1?.text_7}
                    </Link>
                  ) : (
                    <Skeleton width={180} />
                  )}
                </div>
                <div className="flex items-center gap-2 lg:pt-[8px]">
                  <div className="flex items-center gap-2">
                    <Link
                      href="http://online.gov.vn/Website/chi-tiet-132923"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/assets/logoSaleNoti.png"
                        alt="Thông báo Bộ Công Thương"
                        width={600}
                        height={277}
                        title="Thông báo Bộ Công Thương"
                      
                        className="w-40 h-auto" // điều chỉnh kích thước tại đây
                      />
                    </Link>
                  </div>

                </div>

              </div>
            </div>

            {/* Cột 2 */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {homeContent ? homeContent?.acf?.footer?.list_2?.text_1 : <Skeleton width={180} />}
              </h2>
              <div className="space-y-3 text-white">{renderList2()}</div>
            </div>

            {/* Cột 3 */}
            <div>
              <h2 className="text-lg font-bold mb-4">
                {homeContent ? homeContent?.acf?.footer?.list_3?.title : <Skeleton width={200} />}
              </h2>
              <div className="divide-y divide-white/50 pb-4 text-white">{renderList3()}</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Luôn hiển thị phần bản quyền */}
      <div className="bg-[#5b457d] w-full">
        <div className="container mx-auto max-w-6xl border-t border-white/10 text-center py-5 bg-[#5b457d] text-white px-2">
          <p className="text-white">
            © CÔNG TY CỔ PHẦN TƯ VẤN DỊCH VỤ ĐÀO TẠO AUM VIỆT NAM - Số 26, ngách 12, ngõ 470 đường
            Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam. Đại
            diện: Bà Ngô Thị Minh Hiếu | Mã số thuế: 0106259355 cấp tại Sở KH&ĐT thành phố Hà Nội
          </p>
        </div>
      </div>
    </>
  );
};
