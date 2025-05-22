import Image from "next/image";
import { FaUser } from "react-icons/fa";
import SectionTitle from "../SectionTitle";

export const BusinessAreas = ({ busi }: { busi: any }) => {
  const services = [
    {
      title: busi?.content?.service_1?.content?.title || "Viễn thông internet",
      description:
        busi?.content?.service_1?.content?.description ||
        "Dịch vụ và sản phẩm viễn thông, công nghệ thông tin và truyền thông đa phương tiện, cho thuê các công trình viễn thông, CNTT",
      icon: busi?.content?.service_1?.icon || "/assets/Icon/icon-1.png",
      offset: "ml-20"
    },
    {
      title: busi?.content?.service_2?.content?.title || "Tích hợp hệ thống",
      description:
        busi?.content?.service_2?.content?.description ||
        "Dịch vụ VOIP, thiết kế và phát triển phần mềm, phần cứng VOIP, tích hợp các hệ thống hỗ trợ kinh doanh và marketing cho doanh nghiệp.",
      icon: busi?.content?.service_2?.icon || "/assets/Icon/icon2-1.png",
      offset: "ml-4"
    },
    {
      title:
        busi?.content?.service_3?.content?.title || "Sản xuất & thương mại",
      description:
        busi?.content?.service_3?.content?.description ||
        "Nghiên cứu, phát triển, chế tạo, sản xuất thiết bị, sản phẩm viễn thông, công nghệ thông tin, phân phối các sản phẩm thiết bị viễn thông, VNTT",
      icon: busi?.content?.service_3?.icon || "/assets/Icon/icon3.png",
      offset: "ml-4"
    },
    {
      title: busi?.content?.service_4?.content?.title || "Dịch vụ phần mềm",
      description:
        busi?.content?.service_4?.content?.description ||
        "Dịch vụ thiết kế gia công phần mềm cho các doanh nghiệp bao gồm thiết kế website, thiết kế app và các phần mềm quản trị doanh nghiệp.",
      icon: busi?.content?.service_4?.icon || "/assets/Icon/icon4.png",
      offset: "ml-20"
    }
  ];

  return (
    <section className="container max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white shadow-lg rounded-[16px] p-4 px-0 flex items-center space-x-4 ${service.offset}`}
            >
              <div className="w-80 h-83 flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={83}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2 text-[15px] group-hover:text-orange-500 transition">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center lg:text-left">
          <SectionTitle title={" LĨNH VỰC HOẠT ĐỘNG"} icon={<FaUser />} />
          <h2 className="text-3xl font-bold text-[#4A306D] mt-4">
            {busi?.right_cols?.title || "Lĩnh vực kinh doanh"}
          </h2>
          <p className="text-gray-600 mt-4">
            {busi?.right_cols?.description ||
              "TAS đã và đang khẳng định vị thế trên thị trường nội địa và hướng tới thị trường khu vực, quốc tế thông qua những hoạt động kinh doanh chủ lực như: Tích hợp hệ thống, Dịch vụ phần mềm, Viễn thông - Internet và Sản xuất - Phân phối các sản phẩm ICT."}
          </p>

          <div className="mt-8 relative">
            <Image
              src={busi?.right_cols?.image || "/assets/Group-128.png"}
              alt="Business Woman"
              width={600}
              height={400}
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="relative flex justify-center items-center">
          <button className="relative px-6 py-2 border-2 border-orange-500 rounded-full transition bg-gradient-to-r from-white to-white hover:from-[#BC0D2C] hover:to-[#E65F1E] group overflow-hidden ">
            <div className="flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC0D2C] to-[#E65F1E] font-[700] transition-all duration-300 group-hover:translate-x-[-10px] hover:from-[#BC0D2C] group-hover:text-white group-hover:stroke-white">
                {busi?.content?.button || "Xem các giải pháp của chúng tôi"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[5px] stroke-gray-900 group-hover:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
