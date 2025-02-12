import Image from "next/image";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";

export const Trend = (section_8: any) => {
  const content =
    section_8?.section_8?.list_1?.label_3 ||
    `
    <p>Liên hệ ngay với chúng tôi qua số <br> hotline 
    <span class="font-bold text-red-600 ml-1">1900.2727777</span> để được hướng dẫn.</p>
    <p>Chúng tôi trân trọng và rất hân hạnh được phục vụ!</p>
  `;

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="mb-8">
            <SectionTitle
              title={section_8?.section_8?.list_1?.label_1 || "XU THẾ TẤT YẾU"}
              icon={<FaUser />}
            />
          </div>
          <h1
            className="text-[23px] lg:text-[31px] md:text-4xl text-[#4A306D] leading-tight"
            style={{ fontWeight: 900 }}
          >
            {section_8?.section_8?.list_1?.label_2 ||
              "Đồng hành xu thế học Online trên toàn thế giới – thuận tiện – tiết  kiệm "}
          </h1>
          <div
            className="space-y-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex -space-x-4">
            <Image
              src={section_8?.section_8?.list_1?.image || "/assets/image-1.png"}
              alt="Team member 3"
              width={182}
              height={101}
              className="rounded-full border-2 border-white"
            />
          </div>
        </div>

        <div className="relative">
          <Image
            src={section_8?.section_8?.list_2?.image || "/assets/loa.png"}
            alt="Online learning illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
