import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const Scroll = (section_2: any)=>{
    const companies = section_2?.section_2?.list_1
    ? Object.entries(section_2.section_2.list_1)
        .filter(([key, value]) => value)
        .map(([key, value], index) => ({
          id: index + 1,
          name: "Zuiii",
          logo: value as string
        }))
    : [
        { id: 1, name: "Zuiii", logo: "/assets/brand1.webp" },
        { id: 2, name: "Zuiii", logo: "/assets/brand1.webp" },
        { id: 3, name: "Zuiii", logo: "/assets/brand1.webp" },
        { id: 4, name: "Zuiii", logo: "/assets/brand1.webp" },
        { id: 5, name: "Zuiii", logo: "/assets/brand1.webp" }
      ];
    return(
        <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="lg:text-2xl md:text-xl font-bold mb-8">
            {section_2?.section_2?.title ||
              "Hơn 1000+ nhân sự tại các công ty tin tưởng"}
          </h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 }
            }}
            modules={[Autoplay]}
            className="w-full"
          >
            {companies.map((company) => (
              <SwiperSlide key={company.id}>
                <div className="flex items-center justify-center p-4">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    className="h-12 w-auto object-contain"
                    width={120}
                    height={60}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>
    )
}