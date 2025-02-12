"only server";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "@/styles/Post.module.css";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { clean } from "../lib/sanitizeHtml";

export const Post = ({ post }: { post: any }) => {
  const catIds = post?.categories || [];
  const catId = catIds[0];

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

  return (
    <div className="max-w-5xl mx-auto p-6">
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

              <div className="bg-[#F7F7F7] p-6">
                <h3 className="text-xl font-medium mb-4">Trả lời</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *
                </p>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="comment" className="block mb-2 font-medium">
                      Bình luận <span className="text-red-500">*</span>
                    </label>
                    <Textarea id="comment" required className="min-h-[120px] bg-white border-gray-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Tên <span className="text-red-500">*</span>
                      </label>
                      <Input id="name" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input id="email" type="email" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <label htmlFor="website" className="block mb-2 font-medium">
                        Trang web
                      </label>
                      <Input id="website" type="url" className="bg-white border-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-info" />
                    <label htmlFor="save-info" className="text-sm leading-none">
                      Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần bình luận kế tiếp của tôi.
                    </label>
                  </div>
                  <Button type="submit" className="bg-[#584167] hover:bg-[#584167]/90 text-white font-bold px-8 py-3">
                    PHẢN HỒI
                  </Button>
                </form>
              </div>
            </>
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
