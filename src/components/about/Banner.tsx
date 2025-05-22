import Image from "next/image";

export const HeroBanner = ({ banner }: { banner: any }) => {
  return (
    <div className="relative ">
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: "url(/assets/bg-gioi-thieu-1-1.jpg)" }}
      />
      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
          <div className="text-white space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {banner?.content?.title || "Tri Anh Solutions"}
            </h1>
            <p className="text-white text-lg md:text-xl  max-w-xl">
              {banner?.content?.text ||
                "Tự hào là công ty hàng đầu trong lĩnh vực phát triển và xuất khẩu phần mềm đi các nước trên thế giới."}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-4">
                <button
                  className="px-3 py-3 text-[16px] text-gray-800 font-bold bg-white border border-transparent rounded-full hover:text-orange-500 hover:bg-gray-100 transition"
                  style={{
                    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {banner?.content?.button_1 || "Xem giải pháp"}
                </button>

                <button
                  className="px-3 py-3 text-[16px] text-white font-medium rounded-full border border-orange-500 transition hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(92.53deg, #B7042C 29.73%, #E8641B 97.09%)",
                    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {banner?.content?.button_2 || "Đặt lịch chuyên gia tư vấn"}
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src={banner?.content?.image || "/assets/home4_img-1.png"}
              alt="Digital Solutions Illustration"
              width={600}
              height={600}
              className="w-full h-auto"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
