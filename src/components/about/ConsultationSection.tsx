import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";
export const ConsultationSection = ({
  consultation
}: {
  consultation: any;
}) => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#C41230] to-[#E65525]" />
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-center mb-8">
          <SectionTitle
            title={consultation?.section_title || "CẦN TÌM GIẢI PHÁP PHÙ HỢP?"}
            icon={<FaUser />}
          />
        </div>
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {consultation?.title || "Hãy để chúng tôi tư vấn cho bạn?"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md pt-[30px] pr-[20px] pb-[20px] pl-[20px]">
            <CardContent className="p-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/Icon/ic-bf-phone-2.png"
                  alt="Tư vấn khách hàng"
                  width={64}
                  height={67}
                  className="text-indigo-700"
                />
                <h3 className="text-[#333399] text-[19px] font-bold">
                  {consultation?.content?.contact_1?.text_line_1 ||
                    "Hotline tư vấn"}
                  <br></br>
                  {consultation?.content?.contact_1?.text_line_2 || "trực tiếp"}
                </h3>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-lg">
                {consultation?.content?.contact_1?.button || "028 9999 8899"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md pt-[30px] pr-[20px] pb-[20px] pl-[20px]">
            <CardContent className="p-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/Icon/ic-bf-mssg-2.png"
                  alt="Tư vấn khách hàng"
                  width={64}
                  height={67}
                  className="text-blue-500"
                />
                <h3 className="text-[#00aae7] text-[19px] font-bold">
                  {consultation?.content?.contact_2?.text_line_1 ||
                    "Tư vấn khách hàng"}
                  <br />
                  {consultation?.content?.contact_2?.text_line_2 || "chat zalo"}
                </h3>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 text-lg">
                {consultation?.content?.contact_2?.button || "Chat zalo ngay"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md pt-[30px] pr-[20px] pb-[20px] pl-[20px]">
            <CardContent className="p-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/Icon/ic-bf-info-2.png"
                  alt="Tư vấn khách hàng"
                  width={64}
                  height={67}
                  className="text-blue-500"
                />
                <h3 className="text-[#33cccc] text-[19px] font-bold">
                  {consultation?.content?.contact_3?.text_line_1 ||
                    "Để lại thông tin"}
                  <br></br>
                  {consultation?.content?.contact_3?.text_line_2 ||
                    "chúng tôi gọi lại"}
                </h3>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg">
                {consultation?.content?.contact_3?.button || "Yêu cầu liên hệ"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
