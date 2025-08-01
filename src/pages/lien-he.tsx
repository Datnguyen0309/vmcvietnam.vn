import { Contact } from "@/components/contact";
import { GetServerSideProps } from "next";
import { fetchSeo } from "@/utils/seo";
import { useEffect, useState } from "react";
import Head from "next/head";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
interface IPostPage {
  post: any;
  head: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const api_rm_url = process.env.API_RMS_URL || "";
  const api_url = `${api_rm_url}/lien-he`;

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
    const {  head } = props;
  
    const getTitleFromMeta = (head: string) => {
      const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
      return match ? match[1] : null;
    };
  
    const [ogTitleContent, setOgTitleContent] = useState<string | null>(null);
  
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
      <Contact />
    </>
  );
}
