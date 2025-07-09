import Image from "next/image";
import { ConsultationPopup } from "./ConsultationPopup";
import { useState } from "react";

type BannerContent = {
  title?: string;
  text?: string;
  button_1?: string;
  button_2?: string;
  image?: string;
};

type HeroBannerProps = {
  banner?: {
    content?: BannerContent;
  };
};

const fallback = {
  title: "Tri Anh Solutions",
  text: "Tự hào là công ty hàng đầu trong lĩnh vực phát triển và xuất khẩu phần mềm đi các nước trên thế giới.",
  button_1: "Xem giải pháp",
  button_2: "Đặt lịch chuyên gia tư vấn",
  image: "/assets/home4_img-1.png"
};

export const HeroBanner = ({ banner }: HeroBannerProps) => {
  // Sử dụng destructuring kèm fallback
  const {
    title = fallback.title,
    text = fallback.text,
    button_1 = fallback.button_1,
    button_2 = fallback.button_2,
    image = fallback.image
  } = banner?.content ?? {};

  const isLoading = !banner?.content;


  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleButtonClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <><div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: "url(/assets/bg-gioi-thieu-1-1.jpg)" }} />
      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
          <div className="text-white space-y-6">
            {isLoading ? (
              <>
                <div className="h-10 w-2/3 bg-white/20 rounded animate-pulse" />
                <div className="h-6 w-full max-w-xl bg-white/20 rounded animate-pulse" />
                <div className="flex gap-4 mt-4">
                  <div className="h-12 w-40 bg-white/30 rounded-full animate-pulse" />
                  <div className="h-12 w-60 bg-white/30 rounded-full animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {title}
                </h1>
                <p className="text-white text-lg md:text-xl max-w-xl">{text}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex gap-4">
                    <button
                      className="px-3 py-3 text-[16px] text-gray-800 font-bold bg-white border border-transparent rounded-full hover:text-orange-500 hover:bg-gray-100 transition"
                      style={{
                        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.25)"
                      }}
                      onClick={handleButtonClick}
                    >
                      {button_1}
                    </button>
                    <button
                      className="px-3 py-3 text-[16px] text-white font-medium rounded-full border border-orange-500 transition hover:opacity-90"
                      style={{
                        background: "linear-gradient(92.53deg, #B7042C 29.73%, #E8641B 97.09%)",
                        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.25)"
                      }}
                      onClick={handleButtonClick}
                    >
                      {button_2}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="w-full h-[300px] lg:h-[400px] bg-white/20 rounded-lg animate-pulse" />
            ) : (
              <Image
                src={image}
                alt="Digital Solutions Illustration"
                width={600}
                height={600}
                className="w-full h-auto"
                priority />
            )}
          </div>
        </div>
      </div>
    </div><ConsultationPopup isOpen={isPopupOpen} onClose={handleClosePopup} /></>

  );
};
