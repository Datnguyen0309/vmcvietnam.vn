import { BreadCrumb } from "@/components/BreadCrumb";
import styles from "@/styles/PrivacyPolicy.module.css";
import { clean } from "../lib/sanitizeHtml";

export const Policy = ({ post }: { post: any }) => {
  return (
    <>
      <BreadCrumb page={clean(post?.title?.rendered || "Tin tức đang cập nhật")} />
      <div className="bg-Soft-Snow">
          <div className="mx-auto max-w-[1320px]">
              <div className="pt-6 rounded-[5px] bg-white mx-[20px] mb-[10px] ">
              <div
                className={styles["wp-content"]}
                dangerouslySetInnerHTML={{
                  __html: clean(post.content.rendered),
                }}
              />
            </div>
        </div>
      </div>
    </>
  );
};
