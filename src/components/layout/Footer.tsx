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
              <div className="space-y-3 text-white">
                {homeContent?.acf?.footer?.list_2?.group?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Link href={item.url || "#"} target="_blank" rel="noopener noreferrer">
                      {item.title || "Mặc định tên"}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <h2 className="text-lg font-bold mb-4">
                {homeContent?.acf?.footer?.list_3?.title ||
                  "Chính sách và quy định chung"}
              </h2>
              <div className="divide-y divide-white/50  pb-4 text-white">
                {homeContent?.acf?.footer?.list_3?.group?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 py-2">
                    <Link href={item.url || "#"} target="_blank" rel="noopener noreferrer">
                      {item.title || "Mặc định tên"}
                    </Link>
                  </div>
                ))}
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
