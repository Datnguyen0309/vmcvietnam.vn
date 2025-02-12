import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import Link from "next/link";

export default function Component({ headerTop }: { headerTop: any }) {
  return (
    <header className="bg-[#4A3B63] text-white py-2">
      <div className="container max-w-7xl mx-auto ">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={`mailto:${
                headerTop?.mail?.mail_to || "contact@example.com"
              }`}
              className="flex items-center gap-2 text-sm hover:text-gray-200"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">
                {headerTop?.mail?.mail_label || "CONTACT"}
              </span>
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{headerTop?.phone || "+47 900 99 000"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span>{headerTop?.time || "08:00 - 17:00"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-200">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Youtube className="h-4 w-4" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="mailto:contact@example.com"
              className="hover:text-gray-200"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
