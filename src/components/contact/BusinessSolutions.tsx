import Image from "next/image";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";

export const BusinessSolutions = ({ content }: { content: any }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-8">
          <SectionTitle
            title={content?.section_title || "  LIÊN HỆ TRÍ ANH SOLUTION"}
            icon={<FaUser />}
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A306D]">
          {content?.title || "Tìm giải pháp hoàn hảo cho doanh nghiệp của bạn"}
        </h2>
        <div className="space-y-4 text-gray-600 max-w-3xl mx-auto">
          <p>
            {content?.text_1 ||
              "Trí Anh Solution tự hào là một trong những đơn vị hàng đầu cung cấp các giải pháp chuyên đối số cho doanh nghiệp."}
          </p>
          <p>
            {content?.text_2 ||
              "Chúng tôi rất biết ơn và trân trọng sự hợp tác của quý khách hàng trong thời gian qua."}
          </p>
        </div>

        <div className="relative mt-12">
          <Image
            src={content?.image || "/assets/contacts_01-1.jpg"}
            alt="Business Solutions Illustration"
            width={800}
            height={400}
            className="w-full h-auto"
          />
          <div className="absolute -bottom-4 left-0 right-0 h-24 bg-gradient-to-b from-pink-50/0 to-pink-50" />
        </div>
      </div>
    </section>
  );
};
