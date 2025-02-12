import Image from "next/image";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";

export const Necessary = ({ necessary }: { necessary: any }) => {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="mb-8">
            <SectionTitle
              title={necessary?.content?.section_title || " XU THẾ TẤT YẾU"}
              icon={<FaUser />}
            />
          </div>
          <h1
            className="text-[23px] lg:text-[31px] md:text-4xl  text-[#4A306D] leading-tight"
            style={{ fontWeight: 900 }}
          >
            {necessary?.content?.title ||
              "Đồng hành xu thế chuyển đổi số cho doanh nghiệp cả nước."}
          </h1>
          <div className="space-y-2">
            <div
              className=" text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  necessary?.content?.description ||
                  `<p className="mb-2">
                Liên hệ ngay với chúng tôi qua số <br></br> hotline
                <span className="font-bold text-red-600 ml-1">
                  1900.2727777
                </span>
                để được hướng dẫn.
              </p>
              <p>Chúng tôi trân trọng và rất hân hạnh được phục vụ!</p>`
              }}
            />
          </div>

          <div className="flex -space-x-4">
            <Image
              src={necessary?.content?.image || "/assets/image-1.png"}
              alt="Team member 3"
              width={182}
              height={101}
              className="rounded-full border-2 border-white"
            />
          </div>
        </div>

        <div className="relative">
          <Image
            src={necessary?.image || "/assets/loa.png"}
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
