import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Majors = (section_1: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (section_1?.section_1) {
      setLoading(false);
    }
  }, [section_1]);

  const content = section_1?.section_1?.label?.split("\n") || [
    "Bạn yêu thích công nghệ,",
    "Yêu cái đẹp và đam mê sáng tạo.",
    "Bạn đang tìm kiếm một ngành học thời thượng,",
    "Đảm bảo đầu ra có công việc với mức lương hấp dẫn trong tương lai gần.",
    "Cơ hội liên thông các trường ĐH Quốc tế (LUC, Middlesex...)"
  ];

  const courses = [
    {
      title: section_1?.section_1?.list?.list_1?.list_a?.title || "Graphic Design",
      image: section_1?.section_1?.list?.list_1?.list_a?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_1?.list_a?.link || "/graphic-design"
    },
    {
      title: section_1?.section_1?.list?.list_1?.list_b?.title || "Web design",
      image: section_1?.section_1?.list?.list_1?.list_b?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_1?.list_b?.link || "/web-design"
    },
    {
      title: section_1?.section_1?.list?.list_2?.list_a?.title || "Digital Marketing",
      image: section_1?.section_1?.list?.list_2?.list_a?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_2?.list_a?.link || "/digital-marketing"
    },
    {
      title: section_1?.section_1?.list?.list_2?.list_b?.title || "Content Writing",
      image: section_1?.section_1?.list?.list_2?.list_b?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_2?.list_b?.link || "/content-writing"
    },
    {
      title: section_1?.section_1?.list?.list_2?.list_c?.title || "Finance",
      image: section_1?.section_1?.list?.list_2?.list_c?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_2?.list_c?.link || "/finance"
    },
    {
      title: section_1?.section_1?.list?.list_2?.list_d?.title || "Business",
      image: section_1?.section_1?.list?.list_2?.list_d?.image || "/assets/2.webp",
      path: section_1?.section_1?.list?.list_2?.list_d?.link || "/business"
    }
  ];

  const CourseCard = ({
    course
  }: {
    course: { title: string; image: string; path: string };
  }) => {
    return (
      <Link href={course.path}>
        <div className="overflow-hidden border-none cursor-pointer">
          <div className="p-0  transition-transform duration-300  hover:-translate-y-1">
            <Image
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-tl-[15px] rounded-br-[15px]  hover:shadow-xl "
              width={400}
              height={600}
            />
          </div>
          <div className="p-4 text-[#463266]">
            <h3 className="text-[17px] lg:font-semibold lg:text-2xl  text-center">
              {course.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  const CourseCardSkeleton = () => {
    return (
      <div className="overflow-hidden border-none cursor-pointer animate-pulse">
        <div className="p-0">
          <div className="w-full h-48 bg-gray-300 rounded-tl-[15px] rounded-br-[15px]" />
        </div>
        <div className="p-4">
          <div className="h-6 w-3/4 bg-gray-300 mx-auto rounded" />
        </div>
      </div>
    );
  };

  const TextSectionSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-1/2 bg-gray-300 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );


  return (
    <section className="lg:py-16 py-10 bg-white">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {loading ? (
              <TextSectionSkeleton />
            ) : (
              <>
                <h2
                  className="text-3xl lg:text-[40px] font-bold tracking-tighter text-[#463266]"
                  style={{
                    filter: "drop-shadow(4px 5px 4px #ccc)",
                    fontWeight: 700
                  }}
                >
                  {section_1?.section_1?.title || "Các hệ đào tạo"}
                </h2>
                <div className="space-y-2 text-[#525252]">
                  {content.map((line: string, index: number) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </>
            )}
            <Link href="/khoa-hoc">
              <button className="bg-[#463266] hover:bg-[#5a4180] text-white rounded-tl-[15px] rounded-br-[15px] px-4 py-2 flex items-center font-[700] mt-[10px]">
                XEM TẤT CẢ
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </Link>

          </div>
          <div className="grid gap-4 grid-cols-2">
            {loading
              ? [...Array(2)].map((_, i) => <CourseCardSkeleton key={i} />)
              : courses.slice(0, 2).map((course) => (
                <CourseCard key={course.path} course={course} />
              ))}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-8">
          {loading
            ? [...Array(4)].map((_, i) => <CourseCardSkeleton key={i} />)
            : courses.slice(2).map((course) => (
              <CourseCard key={course.path} course={course} />
            ))}
        </div>
      </div>
    </section>
  );
};
