"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";

interface ShareProps {
  url?: string;
}

export const Share = ({ url = "" }: ShareProps) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";
  const fullUrl = `${domain}/${url}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("Link đã được sao chép!");
    } catch (err) {
      alert("Không thể sao chép link, hãy thử lại.");
    }
  };

  return (
    <div className="flex gap-2 justify-center mb-8">
      {/* Facebook */}
      <div className="relative group inline-block">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] p-2.5 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Facebook className="w-4 h-4 text-white" />
        </Link>
        <span className="tooltip">Share on Facebook</span>
      </div>

      {/* Twitter */}
      <div className="relative group inline-block">
        <Link
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] p-2.5 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Twitter className="w-4 h-4 text-white" />
        </Link>
        <span className="tooltip">Share on Twitter</span>
      </div>

      {/* Instagram - không có URL chia sẻ trực tiếp */}
      <div className="relative group inline-block">
        <button
          onClick={handleCopyLink}
          className="bg-[#E1306C] p-2.5 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Instagram className="w-4 h-4 text-white" />
        </button>
        <span className="tooltip">Copy to share on Instagram</span>
      </div>

      {/* Linkedin */}
      <div className="relative group inline-block">
        <Link
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0077B5] p-2.5 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Linkedin className="w-4 h-4 text-white" />
        </Link>
        <span className="tooltip">Share on LinkedIn</span>
      </div>

      {/* Copy link */}
      <div className="relative group inline-block">
        <button
          onClick={handleCopyLink}
          className="bg-gray-600 p-2.5 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <LinkIcon className="w-4 h-4 text-white" />
        </button>
        <span className="tooltip">Copy Link</span>
      </div>

      <style jsx>{`
        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.75rem;
          background: black;
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          opacity: 0;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

        .group:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
