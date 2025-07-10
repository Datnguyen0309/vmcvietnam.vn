"only server";

import styles from "@/styles/Post.module.css";
import { buildCommentTree } from "@/utils/comments";
import { fetchComments, postComment } from "@/utils/fetch-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { CommentComponent } from "../CommentCard";
import { CommentForm } from "../CommentForm";
import { clean } from "../lib/sanitizeHtml";
import { Share } from "./Share";

export const Post = ({ post }: { post: any }) => {
  const catIds = post?.categories || [];
  const catId = catIds[0];
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  useEffect(() => {
    const replaceHrefWithId = () => {
      const ezTocContainer = document.getElementById("ez-toc-container");

      if (ezTocContainer) {
        const tocLinks = ezTocContainer.querySelectorAll('a[href*="#"]');

        tocLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();

            const href = link.getAttribute("href");
            const match = href?.match(/#(.+)$/);

            if (match && match[1]) {
              const id = match[1];
              const targetElement = document.getElementById(id);

              if (targetElement) {
                const offset = 150;
                const targetElementTop =
                  targetElement.getBoundingClientRect().top;
                window.scrollTo({
                  top: window.scrollY + targetElementTop - offset,
                  behavior: "smooth"
                });
              }
            }
          });
        });
      }
    };

    replaceHrefWithId();
  }, [post]);

  const { data: commentsData, isLoading: isLoadingComments } = useQuery(
    `comments-${post.id}`,
    async () =>
      fetchComments({
        postId: Number(post?.id || 0),
      })
  );
  const hanldeReply = ({
    parentId,
    commentsId,
  }: {
    parentId: number | undefined;
    commentsId: number;
  }) => {
    setParentId(commentsId == parentId ? undefined : commentsId);
  };

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const savedName = localStorage.getItem("commentName");
    const savedEmail = localStorage.getItem("commentEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setFormData((prev: any) => ({
        ...prev,
        name: savedName || "",
        email: savedEmail || "",
      }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      localStorage.setItem("commentName", formData.name);
      localStorage.setItem("commentEmail", formData.email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("commentName");
      localStorage.removeItem("commentEmail");
      localStorage.removeItem("rememberMe");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Nếu chọn lưu thông tin, cập nhật lại localStorage
    if (rememberMe) {
      localStorage.setItem("commentName", formData.name);
      localStorage.setItem("commentEmail", formData.email);
      localStorage.setItem("rememberMe", "true");
    }

    try {
      const dataResponse = await postComment({
        postId: post?.id,
        parentId: parentId,
        authorName: formData.name,
        authorEmail: formData.email,
        content: formData.comment,
      });

      if (dataResponse.id) {
        // Xử lý khi gửi thành công
        setFormData({
          name: rememberMe ? formData.name : "",
          email: rememberMe ? formData.email : "",
          comment: "",
        });
        toast.success("Bình luận đã được gửi thành công! Chờ phê duyệt trước khi hiện thị");
        setParentId(undefined);
      } else {
        // Xử lý khi gửi thất bại
        console.error("Lỗi khi gửi bình luận.");
      }
      // Reset form sau khi gửi thành công
    } catch (error) {
      console.error("Lỗi khi đăng bình luận:", error);
    }
  };

  const [authorName, setAuthorName] = useState("");
  
  useEffect(() => {
    const fetchAuthor = async () => {
      if (!post?.author) return;

      try {
        const res = await fetch(`http://10.10.51.16:8686//wp-json/wp/v2/users/${post.author}`);
        const data = await res.json();
        setAuthorName(data.name); // hoặc `data.nickname`, tuỳ cấu hình WP
      } catch (error) {
        console.error("Không lấy được tên tác giả:", error);
      }
    };

    fetchAuthor();
  }, [post?.author]);

  return (
    <div className="max-w-5xl mx-auto p-6 lg:py-20">
      <article className={styles["post"]}>
        <main>
          {post && (
            <>
              <div className={styles["post__main"]}>
                <div className={styles["post__heading"]}>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: clean(post?.title?.rendered)
                    }}
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: clean(post?.content?.rendered)
                  }}
                />
              </div>
              <Share url={`tin-tuc/tin-tuc/${post.slug}`} />
              <div className="bg-[#FDF8F3] p-6 mb-8 flex items-center gap-4 max-w-[768px] mx-auto rounded-[20px]">
                <Image
                  src="/assets/abc.png"
                  alt="Author"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <h2 className="text-[#FF4500] text-2xl font-medium">
                  {authorName || "Tác giả"}
                </h2>
              </div>
            </>
          )}
          <div className=" mb-6 xl:mx-0 mx-[10px]">
            <div className="mx-auto space-y-6">
              <h2 className="text-[24px] font-medium text-Dark-Blue">
                Bình luận ({commentsData?.length || 0})
              </h2>
              <div className="space-y-6">
                {!isLoadingComments &&
                  buildCommentTree(commentsData).map((comment: any, index: number) => (
                    <CommentComponent
                      key={index}
                      comment={comment}
                      parentId={parentId}
                      onReply={hanldeReply}
                      commentFormProps={{
                        replyTo: comment.author,
                        onSubmit: handleSubmit,
                        onChange: handleChange,
                        onRememberMeChange: handleRememberMeChange,
                        rememberMe: rememberMe,
                        name: formData.name,
                        email: formData.email,
                        comment: formData.comment,
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
          {parentId == undefined && (
            <CommentForm
              {...formData}
              rememberMe={rememberMe}
              onChange={handleChange}
              onRememberMeChange={handleRememberMeChange}
              onSubmit={handleSubmit}
            />
          )}
          {!post && (
            <div className={styles["not-found"]}>
              <p>Bài viết này không tồn tại!</p>
              <Link className={styles["back-new"]} href={"/tin-tuc"}>
                Trở về trang tin tức
              </Link>
            </div>
          )}
        </main>
      </article>
    </div>
  );
};
