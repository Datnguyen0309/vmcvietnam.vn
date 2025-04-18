import { CourseDetails } from "@/components/khoa-hoc/CourseDetails";
import { InstructorProfile } from "@/components/khoa-hoc/InstructorProfile";
import { OtherCourse } from "@/components/khoa-hoc/OtherCourse";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSingleModel } from "@/utils/fetch-auth-odoo";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const CourseDetail = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const { data, isLoading, isError } = useQuery(
    [`getKhoaDetailbyslug`, slug],
    () =>
      getSingleModel({
        root: "product",
        type: "get_course_by_slug",
        slug: slug,
      }),
    {
      enabled: !!slug,     }
  );

  return (
    <>
      <PageHeader
        title={data?.data?.name || "Khóa học online thiết kế Graphic cơ bản"}
        breadcrumbs={["Trang chủ", data?.data?.category || "Sản phẩm bán chạy"]}
      />
      <div className="container mx-auto p-4">
        <CourseDetails CourseData={data?.data}  />
      </div>
      <InstructorProfile teacher_info={data?.data?.teacher} />
      <OtherCourse CourseData={data?.data} />
    </>
  );
};

export default CourseDetail;
