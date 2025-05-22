import styles from "@/styles/Post.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { clean } from "./lib/sanitizeHtml";

const Share = dynamic(() => import("./post/Share").then((mod) => mod.Share));
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

export const Branch = (home_content: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const post = home_content?.home_content;

  useEffect(() => {
    if (post) {
      setIsLoading(false);
    }
  }, [post]);

  return (
    <>
      <article className={styles["post"]}>
        <div className={styles["post--share"]}>
          <Share url={post?.slug || "#"} />
        </div>
        <main>
          {post ? (
            <>
              <div className={styles["post__main"]}>
                <div
                  className="px-2"
                  dangerouslySetInnerHTML={{
                    __html: clean(post?.content?.rendered)
                  }}
                />
              </div>
            </>
          ) : null}
        </main>
      </article>
      {isLoading && <Loading />}
    </>
  );
};
