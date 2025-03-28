"only server";

import styles from "@/styles/Post.module.css";
import { buildCommentTree } from "@/utils/comments";
import { fetchComments, postComment } from "@/utils/fetch-auth";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { CommentComponent } from "../CommentCard";
import { CommentForm } from "../CommentForm";
import { clean } from "../lib/sanitizeHtml";

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
  return (
    <div className="max-w-5xl mx-auto p-6 py-20">
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
              <div className="flex gap-2 justify-center mb-8">
                <div className="relative group inline-block">
                  <Link
                    href="#"
                    className="bg-[#FF4500] p-2.5 rounded-full border border-transparent hover:border-[#446084] hover:bg-[#3a589d] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  >
                    <Facebook className="w-4 h-4 text-white" />
                  </Link>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Share on Facebook
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-[6px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></span>
                  </span>
                </div>
                <div className="relative group inline-block">
                  <Link
                    href="#"
                    className="bg-[#FF4500] p-2.5 rounded-full border border-transparent hover:border-[#2478ba] hover:bg-[#2478ba] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  >
                    <Twitter className="w-4 h-4 text-white" />
                  </Link>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Share on Twitter
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-[6px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></span>
                  </span>
                </div>
                <div className="relative group inline-block">
                  <Link
                    href="#"
                    className="bg-[#FF4500] p-2.5 rounded-full border border-transparent hover:border-[#0072b7] hover:bg-[#0072b7] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </Link>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Share on Instagram
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-[6px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></span>
                  </span>
                </div>
                <div className="relative group inline-block">
                  <Link
                    href="#"
                    className="bg-[#FF4500] p-2.5 rounded-full border border-transparent hover:border-[#cb2320 ] hover:bg-[#cb2320] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </Link>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Share on Linkedin
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-[6px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></span>
                  </span>
                </div>
              </div>

              <div className="bg-[#FDF8F3] p-6 mb-8 flex items-center gap-4 max-w-[768px] mx-auto rounded-[20px]">
                <Image
                  src="/assets/abc.png"
                  alt="Author"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <h2 className="text-[#FF4500] text-2xl font-medium">Thiện Lệ</h2>
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
