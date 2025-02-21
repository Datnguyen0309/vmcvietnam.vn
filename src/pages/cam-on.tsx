"server only";

import { DangkyTc } from "@/components/dang-ky-thanh-cong";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface IPostPage {
  post: any;
  head: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const api_rm_url = process.env.API_RMS_URL || "";
  const api_url = `${api_rm_url}/cam-on`;

  try {
    const res = await fetchSeo({ url: api_url, revalidate: 3600 });
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
  const { post, head } = props;

  // Function to extract title from meta
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };

  // State to hold the content of og:title meta tag
  const [ogTitleContent, setOgTitleContent] = useState<string | null>(null);

  // Update ogTitleContent when head changes
  useEffect(() => {
    if (head) {
      const title = getTitleFromMeta(head);
      setOgTitleContent(title);
    }
  }, [head]);
  return (
    <>
      {head && (
        <Head>
          {ReactHtmlParser(replaceSeoRM(head))}
          <title>{ogTitleContent}</title>
        </Head>
      )}

        <DangkyTc />
    </>
  );
}
