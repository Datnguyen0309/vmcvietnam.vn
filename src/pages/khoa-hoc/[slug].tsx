import { CourseDetails } from "@/components/khoa-hoc/CourseDetails";
import { InstructorProfile } from "@/components/khoa-hoc/InstructorProfile";
import { OtherCourse } from "@/components/khoa-hoc/OtherCourse";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSingleModel } from "@/utils/fetch-auth-odoo";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const api_url = process.env.API_URL || "";
  const url = process.env.API_RMS_URL || "";

  try {
    const params = context.params;
    const slug = params?.slug || "";

    const res = await fetchAuth({
      url: `${api_url}/posts?slug=${slug}`,
      revalidate: 3600
    });

    const posts = await res.json();
    const post = posts?.[0];

    if (!post) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }

    const resSeo = await fetchSeo({
      url: `${url}/${slug}`,
      revalidate: 3600
    });
    const head = await resSeo.json();

    return {
      props: { post, head: head.head || null }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
};


interface IPostPage {
  head: string;
}
const CourseDetail = (props: IPostPage) => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };
  // Lấy nội dung từ thẻ meta
  const ogTitleContent = props.head ? getTitleFromMeta(props.head) : null;

  const { data, isLoading, isError } = useQuery(
    [`getKhoaDetailbyslug`, slug],
    () =>
      getSingleModel({
        root: "product",
        type: "get_course_by_slug",
        slug: slug,
      }),
    {
      enabled: !!slug,
    }
  );
  useEffect(() => {
    if (!isLoading && (!data || !data.data)) {
      router.push("/");
    }
  }, [isLoading, data]);
  return (
    <>
      {props.head && (
        <div>
          <Head>
            {ReactHtmlParser(replaceSeoRM(props.head))}
            <title>{ogTitleContent || data?.data?.name}</title>
          </Head>
        </div>
      )}
      <PageHeader
        title={data?.data?.name || "Khóa học online thiết kế Graphic cơ bản"}
        breadcrumbs={["Trang chủ", data?.data?.category || "Sản phẩm bán chạy"]}
      />
      <div className="container mx-auto p-4">
        <CourseDetails CourseData={data?.data} />
      </div>
      <InstructorProfile teacher_info={data?.data?.teacher} />
      <OtherCourse CourseData={data?.data} />
    </>
  );
};

export default CourseDetail;
