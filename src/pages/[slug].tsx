import { LayoutNganh } from "@/components/LayouNganh";
import { clean } from "@/components/lib/sanitizeHtml";
import styles from "@/styles/Post.module.css";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IPostPage {
    post: any;
    head: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const api_url = process.env.API_URL || "";
    const url = process.env.API_RMS_URL || "";
    const slug = context.params?.slug || "";

    let post: any = null;
    let head: string | null = null;

    try {
        const res = await fetchAuth({
            url: `${api_url}/posts?slug=${slug}`,
            revalidate: 3600,
        });

        if (res.ok) {
            const posts = await res.json();
            post = posts?.[0] || null;
        }
    } catch (err) {
        console.warn("Post fetch failed:", err);
    }

    try {
        const resSeo = await fetchSeo({
            url: `${url}/${slug}`,
            revalidate: 3600,
        });

        if (resSeo.ok) {
            const seo = await resSeo.json();
            head = seo?.head || null;
        }
    } catch (err) {
        console.warn("SEO fetch failed:", err);
    }

    return {
        props: {
            post,
            head,
        },
    };
};

export const KhoaHocByCate = ({ head, post }: IPostPage) => {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (router.isReady && !slug) router.push("/");
    }, [router.isReady, slug]);

    const category = Array.isArray(slug) ? slug[0] : slug || "all";

    const ogTitleContent = head
        ? head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)?.[1]
        : null;

    return slug ? (
        <>
            <Head>
                {head ? ReactHtmlParser(replaceSeoRM(head)) : null}
                <title>{ogTitleContent?.trim() || post?.title?.rendered || "Khóa học"}</title>
            </Head>

            <LayoutNganh category={category} titles="test" />

            <div className="container max-w-7xl mx-auto px-4">
                <article className={styles["post"]}>
                    <main>
                        {post ? (
                            <div className={styles["post__main"]}>
                                <div className={styles["post__heading"]}>
                                    <h1
                                        dangerouslySetInnerHTML={{
                                            __html: clean(post?.title?.rendered),
                                        }}
                                    />
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: clean(post?.content?.rendered),
                                    }}
                                />
                            </div>
                        ) : null}

                    </main>
                </article>
            </div>
        </>
    ) : null;
};

export default KhoaHocByCate;
