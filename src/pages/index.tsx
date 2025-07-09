"server only";

import { Home } from "@/components/home";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import xss from "xss";

interface IPostPage {
  post: any;
  head: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const api_rm_url = process.env.API_RMS_URL || "";
  const api_url = `${api_rm_url}`;

  try {
    const res = await fetchSeo({ url: api_url, revalidate: 3600 });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const head = await res.json();
    return {
      props: {
        head: head?.head || null
      }
    };
  } catch (error) {
    return {
      props: {
        head: null
      }
    };
  }
};

export default function Page(props: IPostPage) {
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? xss(match[1]) : null;
  };

  const ogTitleContent = props.head ? getTitleFromMeta(props.head) : null;

  return (
    <>
      {props.head && (
        <Head>
          <title>{ogTitleContent}</title>
          {ReactHtmlParser(replaceSeoRM(props.head))}
        </Head>
      )}
      <Home />
    </>
  );
}