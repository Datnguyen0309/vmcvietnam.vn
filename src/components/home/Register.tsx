import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Register = (section_4: any) => {
  const stats = [
    {
      number: section_4?.section_4?.list_2?.list_1?.label_1 || "08",
      label: section_4?.section_4?.list_2?.list_1?.label_2 || "Năm kinh nghiệm",
      sublabel:
        section_4?.section_4?.list_2?.list_1?.label_3 ||
        "Phương pháp chuẩn quốc tế"
    },
    {
      number: section_4?.section_4?.list_2?.list_2?.label_1 || "10",
      label: section_4?.section_4?.list_2?.list_2?.label_2 || "Cơ sở toàn quốc",
      sublabel: section_4?.section_4?.list_2?.list_2?.label_3 || ""
    },
    {
      number: section_4?.section_4?.list_2?.list_3?.label_1 || "2000",
      label:
        section_4?.section_4?.list_2?.list_3?.label_2 || "Học sinh toàn quốc",
      sublabel: section_4?.section_4?.list_2?.list_3?.label_3 || ""
    }
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "rgb(244, 245, 247)" }}
    >
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="lg:text-[40px] font-[700] text-[#463266]">
              {section_4?.section_4?.list_1?.title || "Về Mew Academy"}
            </h2>
            <p className="text-gray-600">
              {section_4?.section_4?.list_1?.label_1 ||
                "Một tập thể mạnh mẽ được tạo nên bởi những cái tôi độc đáo."}
            </p>
            <div className="flex items-start space-x-2 pl-4 italic text-gray-600">
              <Image
                src="/assets/Icon/fae.jpg"
                alt="Quote icon"
                width={32}
                height={32}
                objectFit="cover"
                className="mt-1"
              />
              <p className="text-[#525252] font-[700]">
                {section_4?.section_4?.list_1?.label_2?.split("\n") ||
                  `Trong suốt quá trình phát triển, Mew Academy may mắn có một lực lượng
                giảng viên trẻ trung và luôn khuyến khích sinh viên thể hiện mình, từ đó
                đóng góp những nhà thiết kế tên tuổi cho ngành Mỹ thuật đa phương tiện Việt Nam và Quốc tế`}
              </p>
            </div>
            <p className="text-gray-600 pb-6">
              {section_4?.section_4?.list_1?.label_3?.split("\n") ||
                `Mew cần tính nghiêm túc, sự kiên trì và cam kết của học viên để đảm bảo các
              khóa học thực sự mang lại hiệu quả cho học viên! `}
            </p>
            <Link href="/gioi-thieu">
              <Button className="bg-[#463266] hover:bg-[#5a4180] text-white rounded-tl-[15px] rounded-br-[15px] px-4 py- flex items-center font-[700] ">
                ĐỌC THÊM
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative h-full min-h-[500px] lg:absolute lg:right-0 lg:w-1/2 lg:h-full">
            <Image
               src={section_4?.section_4?.list_2?.image ||"/assets/bg_module_about.webp"}
              alt="Students at Mew Academy"
              layout="fill"
              objectFit="cover"
              className="rounded-lg lg:rounded-none"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-4 p-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-[#FF8859]/90 text-white p-4 backdrop-blur-sm w-[300px] max-w-[80%]"
                  style={{
                    borderRadius: "8px",
                    borderTopLeftRadius: "25px",
                    borderBottomRightRadius: "25px"
                  }}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-4 items-center">
                      <div className="text-4xl font-bold">{stat.number}</div>
                      <div className="text-sm">
                        {stat.label}
                        {stat.sublabel && (
                          <>
                            <br />
                            {stat.sublabel}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
