import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const ContactHeader = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 "
        style={{
          backgroundImage: "url(/assets/bg-section.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="container max-w-4xl mx-auto px-4 py-16 relative">
        <div className="flex flex-col items-center text-white space-y-4">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Liên hệ</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            {title || "Liên hệ với chúng tôi"}
          </h1>
        </div>
      </div>
    </div>
  );
};
