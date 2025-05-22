"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Testimonial = {
  label_1: string;
  label_2: string;
  label_3: string;
  label_4: number;
  label_5: string;
};

export const Reviews = (section_7: any) => {
  const cmsTestimonials = section_7?.section_7
    ? (Object.entries(section_7.section_7) as [string, Testimonial][])
        .filter(
          ([key, value]) =>
            key.startsWith("list_") &&
            value.label_1 &&
            value.label_2 &&
            value.label_3 &&
            value.label_4 &&
            value.label_5
        )
        .map(([key, value], index) => ({
          id: index + 1,
          name: value.label_1,
          role: value.label_2,
          image: value.label_3,
          rating: value.label_4,
          content: value.label_5.split("\n")
        }))
    : [];

  if (cmsTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-pink-50/50 py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          className="!pb-12"
        >
          {cmsTestimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>

                <blockquote className="mb-6">
                  <p className="text-gray-600 italic leading-relaxed">
                    {testimonial.content.map((line: string, index: number) => (
                      <span key={index}>{line}</span>
                    ))}
                  </p>
                </blockquote>

                <div className="flex flex-col items-center">
                  <cite className="not-italic font-semibold text-[#4A306D]">
                    {testimonial.name}
                  </cite>
                  <span className="text-gray-500 text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
