"server only";

import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/layout";
import { Post } from "@/components/post";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const api_url = process.env.API_URL || "";
  try {
    const params = context.params;
    const slug = params?.slug || "";
    const res = await fetchAuth({
      url: `${api_url}/posts?slug=${slug}`,
      revalidate: 3600
    });
   
    const posts = await res.json();
    const post = posts ? posts[0] : null;

    return {
      props: { post: post || null, }
    };
  } catch (error) {
    console.log(error);
    return {
      props: { post: null, head: null }
    };
  }
};

interface IPostPage {
  post: any;
  head: string;
}

const Page = (props: IPostPage) => {
  const { post, head } = props;
  return (
    <>
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