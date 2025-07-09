"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CourseCard = ({ course }: { course: any }) => {
  const now = Date.now();
  const isPromoValid = (() => {
    if (
      !course?.event_end_date ||
      !course?.event_start_date ||
      isNaN(Date.parse(course.event_start_date)) ||
      isNaN(Date.parse(course.event_end_date))
    ) return false;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const startDate = new Date(course.event_start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(course.event_end_date);
    endDate.setHours(0, 0, 0, 0);

    return startDate <= now && endDate >= now;
  })();



  const rawDays = isPromoValid
    ? Math.floor(
      (new Date(course.event_end_date).setHours(23, 59, 59, 999) - now) /
      (1000 * 60 * 60 * 24)
    )
    : null;

  const daysLeft = rawDays !== null ? Math.max(rawDays, 0) : null;
  const promoPrice = isPromoValid ? course?.price_promo : null;
  const ribbonVariants = {
    initial: { opacity: 0, scale: 0.8, y: -10 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 45,
      transition: { type: "spring", stiffness: 140, damping: 12 },
    },
  };

  return (
    <Link href={`/khoa-hoc/${course?.slug_url}`}>
      <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }}>
        <Card className="relative shadow-md rounded-[6px] rounded-tl-[25px] rounded-br-[25px] overflow-hidden bg-white transition-shadow hover:shadow-xl">
          <div className="relative w-full h-[205px]">
            <Image
              src={course?.image || "/placeholder.svg"}
              alt={course?.name || "Course image"}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              width={600}
              height={400}
            />

            {isPromoValid && (
              <motion.div
                className="absolute top-4 right-[-55px] w-[220px] z-10"
                variants={ribbonVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.1, rotate: 50 }}
              >
                <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white text-center text-xs font-semibold py-2 px-3 shadow-2xl flex flex-col items-center leading-tight relative overflow-hidden rounded-md border-2 border-red-400">
                  {/* effects (glow, shimmer, etc.) */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-400/30 via-pink-400/40 to-red-400/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.7, 0.3],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute top-1 left-2 w-1 h-1 bg-yellow-300 rounded-full"
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1 right-2 w-1 h-1 bg-white rounded-full"
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: 0.8,
                    }}
                  />
                  <motion.div
                    className="absolute top-2 right-1 w-0.5 h-0.5 bg-yellow-200 rounded-full"
                    animate={{
                      scale: [0, 2, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1.2,
                    }}
                  />

                  {/* Main ribbon content */}
                  <motion.div
                    className="relative z-10 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <motion.span
                      className="text-[12px] font-bold tracking-wide"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(255,255,255,0.5)",
                          "0 0 15px rgba(255,255,255,0.8)",
                          "0 0 5px rgba(255,255,255,0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {new Date(course.event_end_date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </motion.span>

                    <motion.span
                      className="text-[11px] tracking-widest uppercase font-extrabold"
                      style={{
                        background: "linear-gradient(45deg, #fff, #ffd700, #fff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ƯU ĐÃI TỚI
                    </motion.span>

                    {daysLeft !== null && (
                      <motion.span
                        className="text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-full mt-1"
                        animate={{
                          scale: [1, 1.1, 1],
                          backgroundColor: [
                            "rgba(255,255,255,0.2)",
                            "rgba(255,255,255,0.4)",
                            "rgba(255,255,255,0.2)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {daysLeft === 0 ? "Hết hạn hôm nay" : `Còn ${daysLeft} ngày`}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Border animation */}
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-300/50 rounded-md"
                    animate={{
                      borderColor: [
                        "rgba(253, 224, 71, 0.5)",
                        "rgba(253, 224, 71, 1)",
                        "rgba(253, 224, 71, 0.5)",
                      ],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="text-[20px] text-[#4A306D] font-bold line-clamp-2 min-h-[48px]">
              {course?.name}
            </h3>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-gray-500 line-through">
                {promoPrice
                  ? `${Number(promoPrice).toLocaleString("vi-VN")} đ`
                  : null}
              </div>
              <motion.div
                className="text-white text-[15px] font-bold px-3 py-1 rounded-full shadow-md"
                style={{ background: "#4A306D" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {Number(course?.price).toLocaleString("vi-VN")} đ
              </motion.div>
            </div>
          </CardContent>

          <div className="border-t border-gray-200 mx-4" />

          <CardFooter className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={course?.teacher?.image || "/placeholder.svg?height=32&width=32"}
                alt={course?.teacher?.name || "Teacher"}
                width={32}
                height={32}
                className="rounded-full object-cover"
                style={{ aspectRatio: "1 / 1" }}
              />
              <span className="text-sm text-gray-600">
                {course?.teacher?.name}
              </span>
            </div>

            <motion.div
              className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
              whileHover={{ x: 5 }}
            >
              Chi tiết
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};


export const SkeletonCourseCard = () => {
  return (
    <Card
      className={`
        overflow-visible bg-white relative shadow-md 
        rounded-[6px] rounded-tl-[25px] rounded-br-[25px]
        animate-pulse
      `}
    >
      <div className="relative w-full h-[205px] bg-gray-200 rounded-t-[6px]" />
      <CardContent className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-300 w-1/3 rounded" />
          <div className="h-6 bg-gray-300 w-1/3 rounded-full" />
        </div>
      </CardContent>
      <div className="border-t border-gray-200 mx-4"></div>
      <CardFooter className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-16" />
      </CardFooter>
    </Card>
  )
}


