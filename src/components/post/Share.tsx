"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

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
    <>
    <div className="flex gap-2 justify-center mb-8">
      <div className="relative group inline-block">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `${domain}/${url}`
          )}`}
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
          href={`mailto:?subject=${encodeURIComponent(
            "Bài viết "
          )}&body=${encodeURIComponent(`Xem bài viết tại: ${domain}/${url}`)}`}
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
          href={`mailto:?subject=${encodeURIComponent(
            "Bài viết "
          )}&body=${encodeURIComponent(`Xem bài viết tại: ${domain}/${url}`)}`}
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
          href={`mailto:?subject=${encodeURIComponent(
            "Bài viết "
          )}&body=${encodeURIComponent(`Xem bài viết tại: ${domain}/${url}`)}`}
          className="bg-[#FF4500] p-2.5 rounded-full border border-transparent hover:border-[#cb2320 ] hover:bg-[#cb2320] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Linkedin className="w-4 h-4 text-white" />
        </Link>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Share on Linkedin
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-[6px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></span>
        </span>
      </div>
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
          className="h-6 w-6" />
      </button>
    </div></>
  );
};
