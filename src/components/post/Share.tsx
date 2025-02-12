"use client";

import Image from "next/image";
import Link from "next/link";

interface ShareProps {
  url?: string;
}

export const Share = ({ url = "" }: ShareProps) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${domain}/${url}`);
      alert("Link đã được sao chép!");
    } catch (err) {
      alert("Không thể sao chép link, hãy thử lại.");
    }
  };

  return (
    <div className="sticky top-[125px] flex flex-row lg:flex-col items-center space-x-3 mb-2 lg:space-x-0 lg:space-y-4">
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `${domain}/${url}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          aria-label="facebook"
          className="flex items-center justify-center w-10 h-10 rounded-full border p-2 hover:border-orange-500"
        >
          <Image
            src="/assets/s-facebooks.svg"
            width={40}
            height={40}
            alt="facebook"
            className="h-6 w-6"
          />
        </button>
      </Link>
      <Link
        href={`mailto:?subject=${encodeURIComponent(
          "Bài viết "
        )}&body=${encodeURIComponent(`Xem bài viết tại: ${domain}/${url}`)}`}
      >
        <button
          aria-label="email"
          className="flex items-center justify-center w-10 h-10 rounded-full border p-2 hover:border-orange-500"
        >
          <Image
            src="/assets/s-mail.svg"
            width={40}
            height={40}
            alt="email"
            className="h-6 w-6"
          />
        </button>
      </Link>
      <button
        aria-label="link"
        className="flex items-center justify-center w-10 h-10 rounded-full border p-2 hover:border-orange-500"
        onClick={handleCopyLink}
      >
        <Image
          src="/assets/s-share.svg"
          width={40}
          height={40}
          alt="share"
          className="h-6 w-6"
        />
      </button>
    </div>
  );
};
