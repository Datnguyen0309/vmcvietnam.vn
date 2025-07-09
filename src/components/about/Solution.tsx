"use client"


import Image from "next/image"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import SectionTitle from "../SectionTitle"
import { ConsultationPopup } from "./ConsultationPopup"


export const Solution = ({ AboutUs }: { AboutUs: any }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleButtonClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={AboutUs?.image || "/assets/Group-73.png"}
                alt="Tri Anh Solutions Technology"
                width={600}
                height={600}
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
          <div className="space-y-6 self-center">
            <SectionTitle title={"  ABOUT US"} icon={<FaUser />} />
            <h2 className="text-xl md:text-3xl font-bold text-[#4A306D]">
              {AboutUs?.content?.company_name_line_1 || "Công ty TNHH"}
              <br />
              {AboutUs?.content?.company_name_line_2 || "Giải Pháp Công Nghệ Trí Anh"}
            </h2>

            <div className="space-y-4 text-gray-600">
              <p className="text-[#f03800] font-[700]">
                {AboutUs?.content?.sologan ||
                  "Trí Anh Solution (TAS) hiện là một trong những Công ty Viễn thông và Công Nghệ Thông tin hàng đầu tại Việt Nam."}
              </p>
              <p>
                {AboutUs?.content?.description ||
                  "Luôn kiên trì với định hướng Công nghệ hàng đầu là năng lực cốt lõi, TAS đã xây dựng và phát triển môi trường làm việc chuyên nghiệp với gần 100 kỹ sư và cử nhân. Trong nhiều năm liền, TAS luôn giữ tốc độ tăng trưởng cao và dự kiến tiếp tục tăng trưởng mạnh mẽ trong những năm tới."}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <div className="relative flex justify-center items-center">
                <button
                  onClick={handleButtonClick}
                  className="relative px-6 py-2 border-2 border-orange-500 rounded-full transition bg-gradient-to-r from-white to-white hover:from-[#BC0D2C] hover:to-[#E65F1E] group overflow-hidden "
                >
                  <div className="flex items-center justify-center transition-all duration-300 whitespace-nowrap">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC0D2C] to-[#E65F1E] font-[700] transition-all duration-300 group-hover:translate-x-[-2px] hover:from-[#BC0D2C] group-hover:text-white group-hover:stroke-white">
                      {AboutUs?.content?.button || "Giải pháp của chúng tôi"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[2px] stroke-gray-900 group-hover:stroke-white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <ConsultationPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  )
}
