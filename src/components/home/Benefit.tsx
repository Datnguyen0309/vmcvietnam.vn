import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import { Card, CardContent } from "../ui/card";

export const ListBenefit = (section_2: any) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const features = [
    {
      id: 1,
      image:
        section_2?.section_2?.list_2?.group?.list_1?.image ||
        "/assets/Icon/ico_it_main_1.webp",
      title:
        section_2?.section_2?.list_2?.group?.list_1?.title ||
        "Học tập mọi lúc, mọi nơi",
      description:
        section_2?.section_2?.list_2?.group?.list_1?.desc?.split("\n") ||
        "Khi đăng ký khóa học, không như các hình thức học khác, với Mew Academy bạn có thể học mọi lúc, mọi nơi."
    },
    {
      id: 2,
      image:
        section_2?.section_2?.list_2?.group?.list_2?.image ||
        "/assets/Icon/ico_it_main_2.webp",
      title:
        section_2?.section_2?.list_2?.group?.list_2?.title ||
        "Giảng viên nhiệt huyết",
      description:
        section_2?.section_2?.list_2?.group?.list_2?.desc?.split("\n") ||
        "Bạn không hiểu bài, đừng lo hãy nhắn tin trực tiếp với giảng viên, bạn sẽ luôn được quan tâm hỗ trợ để đạt được thành tích mong muốn."
    },
    {
      id: 3,
      image:
        section_2?.section_2?.list_2?.group?.list_3?.image ||
        "/assets/Icon/ico_it_main_3.webp",
      title:
        section_2?.section_2?.list_2?.group?.list_3?.title ||
        "Kho tài liệu đồ sộ",
      description:
        section_2?.section_2?.list_2?.group?.list_3?.desc?.split("\n") ||
        "Với hơn 5000 bài giảng, 200.000 bài tập, 4000 đề thi cùng rất nhiều tài liệu thú vị giúp bạn thoải sức học tập không mệt nghỉ."
    }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
        <div className="relative">
          <div className="absolute -z-10 w-[80%] h-[80%] bg-purple-100 rounded-full blur-3xl" />
          <Image
            src={section_2?.section_2?.list_2?.image || "/assets/bn_main.png"}
            alt="Student learning"
            width={500}
            height={500}
            className="relative z-10"
          />
        </div>

        <div className="space-y-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="rounded-lg shadow-md transition-transform duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredCardId(feature?.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{
                transition: "all 0.3s ease-in-out",
                background:
                  hoveredCardId === feature.id
                    ? "linear-gradient(62.14deg, #FFDAA3 -0.06%, rgba(255, 255, 255, 0) 43.03%)"
                    : "transparent",
                filter:
                  hoveredCardId === feature.id
                    ? "drop-shadow(0px 4px 35px rgba(245, 118, 0, 0.32))"
                    : "none"
              }}
            >
              <CardContent className="relative flex flex-col items-start gap-4 p-6">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="z-10"
                />
                <div className="z-10">
                  <h3 className="font-semibold mb-2 lg:text-[22px]">
                    {feature.title}
                  </h3>
                  <p className=" lg:text-[17px] text-[#000000]">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
