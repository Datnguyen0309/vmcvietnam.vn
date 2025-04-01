import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getHomeContent();
  }, []);
  return (
    <>
      <footer
        className="bg-[#4A306D] text-white bg-cover bg-center py-10"
        style={{
          backgroundImage:
            "url('https://webkhoahoc.giaodienwebmau.com/wp-content/uploads/2023/08/wavy.webp')"
        }}
      >
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {homeContent?.acf?.footer?.list_1?.text_1 ||
                  "Thông tin liên hệ"}
              </h2>
              <div className="space-y-3 text-white">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p className="text-white">
                    {homeContent?.acf?.footer?.list_1?.text_2 ||
                      "Tầng 4, Tòa nhà The Prince SG 17-19-21 Nguyễn Văn Trỗi, Phường   11, Quận Phú Nhuận, TPHCM"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <Link
                    href={
                      homeContent?.acf?.footer?.list_1?.text_3 ||
                      "028 9999 8899 "
                    }
                  >
                    {homeContent?.acf?.footer?.list_1?.text_4 ||
                      "028 9999 8899"}{" "}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <Link
                    href={
                      homeContent?.acf?.footer?.list_1?.text_5 ||
                      "mailto:sales@trianh.vn"
                    }
                  >
                    {homeContent?.acf?.footer?.list_1?.text_6 ||
                      "sales@trianh.vn"}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <Link
                    href={
                      homeContent?.acf?.footer?.list_1?.text_7 ||
                      "http://www.trianh.vn"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {homeContent?.acf?.footer?.list_1?.text_7 ||
                      "www.trianh.vn "}
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {homeContent?.acf?.footer?.list_2?.text_1 ||
                  "Hỗ trợ khách hàng"}
              </h2>
              <div className="space-y-3">
                <p className="text-white">
                  {homeContent?.acf?.footer?.list_2?.text_2 ||
                    "Hotline Sale Saletech & Martech"}
                </p>
                <p className="text-white">
                  {homeContent?.acf?.footer?.list_2?.text_3 || "028 9999 8899"}
                </p>
                <p className="text-white">
                  {homeContent?.acf?.footer?.list_2?.text_4 || "1900 272777"}
                </p>
                <p className="text-white">
                  {homeContent?.acf?.footer?.list_2?.text_5 || "Email sale"}
                </p>
                <Link
                  href={
                    homeContent?.acf?.footer?.list_2?.text_6 ||
                    "mailto:sale@trianh.vn"
                  }
                >
                  {homeContent?.acf?.footer?.list_2?.text_7 || "sale@trianh.vn"}
                </Link>
                <div className="mt-6">
                  <p className="mb-4 text-white">
                    {homeContent?.acf?.footer?.list_2?.text_8 ||
                      "Kết nối với chúng tôi"}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href={
                        homeContent?.acf?.footer?.list_2?.list_3?.list_4.url ||
                        "#"
                      }
                      className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </Link>
                    <Link
                      href={
                        homeContent?.acf?.footer?.list_2?.list_3?.list_5?.url ||
                        "mailto:sale@trianh.vn"
                      }
                      className="bg-gray-600 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </Link>
                    <Link
                      href={
                        homeContent?.acf?.footer?.list_2?.list_3?.list_6?.url ||
                        "tel:02899998899"
                      }
                      className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </Link>
                    <Link
                      href={
                        homeContent?.acf?.footer?.list_2?.list_3?.list_7?.url ||
                        "#"
                      }
                      className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                        <path
                          fill="white"
                          d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="text-lg font-bold mb-4">
                {homeContent?.acf?.footer?.list_3?.title ||
                  "Chính sách và quy định chung"}
              </h2>
              <div className="divide-y divide-white/50">
                <Link
                  href={homeContent?.acf?.footer?.list_3?.text_1 || "/policies"}
                  className="block py-3"
                >
                  {homeContent?.acf?.footer?.list_3?.text_2 ||
                    "Chính sách và quy định"}
                </Link>
                <Link
                  href={homeContent?.acf?.footer?.list_3?.text_3 || "/privacy"}
                  className="block py-3"
                >
                  {homeContent?.acf?.footer?.list_3?.text_4 ||
                    "Chính sách bảo mật"}
                </Link>
                <Link
                  href={homeContent?.acf?.footer?.list_3?.text_5 || "/refund"}
                  className="block py-3"
                >
                  {homeContent?.acf?.footer?.list_3?.text_6 ||
                    "Chính sách hoàn tiền"}
                </Link>
                <Link
                  href={homeContent?.acf?.footer?.list_3?.text_7 || "/purchase"}
                  className="block py-3"
                >
                  {homeContent?.acf?.footer?.list_3?.text_8 ||
                    "Chính sách mua hàng"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="border-t border-white/10  text-center py-5 bg-[#5b457d] text-[rgba(255,255,255,.5)]">
        <p>Copyright © 2024 AUM Việt Nam</p>
      </div>
    </>
  );
};
