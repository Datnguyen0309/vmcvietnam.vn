"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const getIframeSrc = (iframeString: string) => {
  // Sử dụng regex để lấy giá trị của thuộc tính src
  const match = iframeString.match(/<iframe.*?src="(.*?)"/);
  return match ? match[1] : "";
};

export const ContactSection = ({
  contact,
  mapFrame
}: {
  contact: any;
  mapFrame: string;
}) => {
  const iframeSrc = mapFrame
    ? getIframeSrc(mapFrame)
    : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7838.509980996889!2d106.680564!3d10.791772!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecfe5d3904f%3A0x24a2e89bd76055e0!2sTriAnh%20Solutions!5e0!3m2!1sen!2sus!4v1732326520569!5m2!1sen!2sus";
  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#4A306D] mb-4">
                {contact?.contact_info?.title || "Thông tin liên hệ"}
              </h2>
              <p className="text-gray-600">
                {contact?.contact_info?.description ||
                  "TAS có dịch vụ hỗ trợ linh hoạt và đa kênh thông qua trò chuyện trực tiếp, email và trau đổi. Tôi đảm bảo rằng bạn sẽ có thể giải quyết mọi vấn đề trong vòng 24 giờ"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#4A306D] mb-2">
                  {contact?.contact_info?.contact_1 || "Trụ sở chính"}:
                </h3>
                <div className="flex items-start gap-2 text-gray-600">
                  <Building2 className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>
                    {contact?.contact_info?.info_1 ||
                      "94/12 Nguyễn Tư Giản, Phường 12,Quận Gò Vấp, Tp.HCM"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#4A306D] mb-2">
                  {contact?.contact_info?.contact_2 || "Văn phòng giao dịch"}:
                </h3>
                <div className="flex items-start gap-2 text-gray-600">
                  <Building2 className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>
                    {contact?.contact_info?.info_2 ||
                      "Tầng 4, P1, 423, Tòa nhà Prince ResidenceSố 17-19-21 Nguyễn Văn Trỗi, Phường 12, Quận Phú Nhuận, TPHCM, Việt Nam"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#4A306D] mb-2">
                  {contact?.contact_info?.contact_3 || "Điện thoại"}:
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <p>
                    {contact?.contact_info?.info_3 ||
                      "028 9999 8899 và 1900 272777"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#4A306D] mb-2">
                  {contact?.contact_info?.contact_4 || "Địa chỉ email"}:
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <Link
                    href={`mailto:${
                      contact?.contact_info?.info_4 || "sales@trianh.vn"
                    }`}
                    className="hover:text-[#4A306D]"
                  >
                    {contact?.contact_info?.info_4 || "sales@trianh.vn"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#4A306D] mb-4">
                  {contact?.columns_right?.title || "Để lại thông tin liên hệ"}
                </h2>
                <p className="text-gray-600">
                  {contact?.columns_right?.description ||
                    "Vui lòng nhập đủ thông tin liên hệ của bạn, nhân viên của TAS sẽ liên hệ sớm nhất để giải đáp và tư vấn cho bạn."}
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Họ và tên" className="border-gray-300" />
                  <Input
                    placeholder="Số điện thoại"
                    type="tel"
                    className="border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Địa chỉ email"
                    type="email"
                    className="border-gray-300"
                  />
                  <Input
                    placeholder="Lĩnh vực hoạt động"
                    className="border-gray-300"
                  />
                </div>

                <Textarea
                  placeholder="Nội dung"
                  className="min-h-[150px] border-gray-300"
                />

                <Button
                  type="submit"
                  className="bg-[#4A306D] hover:bg-[#4A306D]/90"
                >
                  Gửi thông tin
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <iframe
          src={iframeSrc}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};
