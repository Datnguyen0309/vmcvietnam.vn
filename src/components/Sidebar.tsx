import Image from "next/image";
import { ReactNode } from "react";
import { FormMain } from "./layout/FormContact";

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl  text-[#213F99] font-semibold pb-5 text-center lg:text-left">
    {children}
  </h3>
);

export const Sidebar = (Sidebar: any) => {
  return (
    <div>
      <div>
        <SectionHeading>
          {Sidebar?.Sidebar?.text_1 || "Đăng ký tư vấn "}{" "}
        </SectionHeading>
        <FormMain />
      </div>
      <div className="py-12">
        <SectionHeading>
          {Sidebar?.Sidebar?.text_2 || "Mạng xã hội"}
        </SectionHeading>
        <div className="rounded-sm p-6 border border-gray-300"></div>
      </div>
      <div>
        <Image
          alt="social icon"
          src={Sidebar?.Sidebar?.text_6 || "/assets/bannergt.webp"}
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};
