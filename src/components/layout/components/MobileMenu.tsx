"use client";

import { Logo } from "@/components/Logo";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import { MenuLinkSub } from "./MenuLink";
import { useQuery } from "react-query";
import { getDataSetUp } from "@/utils/fetch-auth-odoo";
import classnames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  href: string;
  label: string;
  subLinks?: NavLink[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/tin-tuc", label: "Blog" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function MobileMenu({
  activeLink,
  isScrolled,
  logo,
}: {
  activeLink: string | null;
  isScrolled: boolean;
  logo: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const { data } = useQuery("getListCate", () =>
    getDataSetUp({ root: "product", type: "product-categories" })
  );
  const categoryList = data?.data || [];
  const toggleSubMenu = useCallback((label: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  }, []);

  const NavItem = ({ item }: { item: NavLink }) => {
    const hasSubMenu = item.href === "/khoa-hoc" && categoryList.length > 0;
    const isSubMenuOpen = openSubMenus.includes(item.label);

    return (
      <div>
        <div className="flex items-center justify-between py-2">
          <Link
            href={item.href}
            className={classnames(
              "text-base font-medium text-gray-800 hover:text-[#463266] transition-all duration-200",
              item.href === "#" && "pointer-events-none"
            )}
            onClick={() => !hasSubMenu && setIsOpen(false)}
          >
            {item.label}
          </Link>
          {hasSubMenu && (
            <button
              onClick={() => toggleSubMenu(item.label)}
              className="p-1 text-gray-600 hover:text-[#463266] transition-all" // Giảm padding icon
              aria-expanded={isSubMenuOpen}
            >
              {isSubMenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
        </div>
        <AnimatePresence>
          {hasSubMenu && isSubMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 mt-1 space-y-1 overflow-hidden" 
            >
              {categoryList.map((link: any, index: number) => (
                <MenuLinkSub
                  key={index}
                  href={`/khoa-hoc?type=${link.slug}`}
                  label={link.name}
                  activeLink={activeLink}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className="lg:hidden">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-4 h-14"> 
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 text-gray-700 hover:text-gray-900 transition-all"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Logo logo={logo} />
        </nav>
      </div>

      {/* Overlay khi mở menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-lg overflow-y-auto" // Thu nhỏ chiều rộng menu
            >
              <div className="px-4 py-5">
                <div className="flex justify-between items-center">
                  <Logo logo={logo} />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-700 hover:text-gray-900 transition-all"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 space-y-2"> {/* Giảm khoảng cách các mục */}
                  {navLinks.map((item) => (
                    <NavItem key={item.label} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
