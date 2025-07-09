import ErrorBoundary from "@/components/ErrorBoundary";
import { Post } from "@/components/post";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import ReactHtmlParser from "html-react-parser";

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

    if (!res.ok) throw new Error(`Posts fetch failed with status: ${res.statusText}`);

    const posts = await res.json();
    const post = posts && posts[0] ? posts[0] : null;

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
      props: {
        post,
        head: head.head || null
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps (slug.tsx):", error);
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
};


interface IPostPage {
  post: any;
  head: string;
}


const Page = (props: IPostPage) => {
  const { post } = props;
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };
  // Lấy nội dung từ thẻ meta
  const ogTitleContent = props.head ? getTitleFromMeta(props.head) : null;
  return (
    <>
     {props.head && (
        <div>
          <Head>
            {ReactHtmlParser(replaceSeoRM(props.head))}
            <title>{ogTitleContent}</title>
          </Head>
        </div>
      )}
      <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
        <Post post={post} />
      </ErrorBoundary>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return { page };
};

export default Page;