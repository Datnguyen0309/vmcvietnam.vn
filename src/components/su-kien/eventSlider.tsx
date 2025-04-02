"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SlideProps {
  id: string
  imageSrc: string
  title: string
}

export default function EventSlider(group: any) {
  const slides: SlideProps[] = [
    {
      id: "slide1",
      imageSrc: group?.group?.banner_1 || "/assets/bg-gioi-thieu-1-1.jpg",
      title: "Sự kiện 1",
    },
    {
      id: "slide2",
      imageSrc: group?.group?.banner_2 || "/assets/g.webp",
      title: "Sự kiện 2",
    },
    {
      id: "slide3",
      imageSrc: group?.group?.banner_3 || "/assets/bg-gioi-thieu-1-1.jpg",
      title: "Sự kiện 3",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="relative w-full h-[130px] md:h-[700px] overflow-hidden bg-contain md:bg-cover"
    >

      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <Image
              src={slide.imageSrc || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

