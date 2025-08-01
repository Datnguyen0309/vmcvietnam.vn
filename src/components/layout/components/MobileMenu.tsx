"use client";

import { Logo } from "@/components/Logo";
import { useProductCategories } from "@/hooks/useProductCategories";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ activeLink, logo }: { activeLink: string | null; logo: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<number, boolean>>({});
  const { data } = useProductCategories();;
  const toggleSubMenu = (id: number) => {
    setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allCategories =
    data?.data?.find((group: any) => group.group_name?.trim() === "All")?.data || [];

  const MobileRecursiveMenuItem = ({ category }: { category: any }) => {
    return (
      <div key={category.id}>
        <div className="flex justify-between items-center py-2 border-b">
          <Link href={`/${category.slug}`} className="text-lg font-medium text-gray-800">
            {category.name}
          </Link>
          {category.child_categories && category.child_categories.length > 0 && (
            <button onClick={() => toggleSubMenu(category.id)} className="p-1">
              {openSubMenus[category.id] ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        <AnimatePresence>
          {openSubMenus[category.id] && category.child_categories && category.child_categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 mt-2 space-y-2"
            >
              {category.child_categories.map((child: any) => (
                <MobileRecursiveMenuItem key={child.id} category={child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className="xl:hidden">
      <div className="container mx-auto px-4 pt-200">
        <nav className="flex items-center justify-between h-14">
          <Logo logo={logo} />
          <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 text-gray-700 hover:text-gray-900 transition-all">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full top-[48px] w-3/4 max-w-xs bg-white z-50 shadow-lg overflow-y-auto p-5 rounded-r-lg"
            >
              <div className="flex justify-between items-center mb-5">
                <Logo logo={logo} />
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-700 hover:text-gray-900 transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="space-y-4">
                <Link href="/" className="block text-lg font-medium text-gray-800">
                  Trang chủ
                </Link>
                <Link href="/gioi-thieu" className="block text-lg font-medium text-gray-800">
                  Giới thiệu
                </Link>

                <div>
                  <button onClick={() => toggleSubMenu(-1)} className="flex justify-between w-full text-lg font-medium text-gray-800 py-2 border-b">
                    Khóa học {openSubMenus[-1] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </button>
                  <AnimatePresence>
                    {openSubMenus[-1] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-2"
                      >
                        {allCategories.map((category: any) => (
                          <MobileRecursiveMenuItem key={category.id} category={category} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/tin-tuc" className="block text-lg font-medium text-gray-800">
                  Tin tức
                </Link>
                <Link href="/lien-he" className="block text-lg font-medium text-gray-800">
                  Liên hệ
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
