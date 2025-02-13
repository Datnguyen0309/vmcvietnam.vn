"use client";

import { Logo } from "@/components/Logo";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { getDataSetUp } from "@/utils/fetch-auth-odoo";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const MenuLinkSub = dynamic(() =>
  import("@/components/layout/components/MenuLink").then((mod) => mod.MenuLinkSub)
);

export default function MobileMenu({ activeLink, logo }: { activeLink: string | null; logo: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<number, boolean>>({});

  const { data } = useQuery("getListCate", () => getDataSetUp({ root: "product", type: "product-categories" }));

  let rootCategories = new Map();
  let childCategoriesMap = new Map();

  data?.data?.forEach((category: any) => {
    if (!category.parent_category) {
      rootCategories.set(category.id, category);
    } else {
      if (!childCategoriesMap.has(category.parent_category.id)) {
        childCategoriesMap.set(category.parent_category.id, []);
      }
      childCategoriesMap.get(category.parent_category.id).push(category);
    }
  });

  const toggleSubMenu = (categoryId: number) => {
    setOpenSubMenus((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  return (
    <header className="lg:hidden">
      <div className="container mx-auto px-4">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-lg overflow-y-auto p-5 rounded-r-lg">
              <div className="flex justify-between items-center mb-5">
                <Logo logo={logo} />
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-700 hover:text-gray-900 transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <Link href="/" className="block text-lg font-medium text-gray-800">Trang chủ</Link>
                <Link href="/gioi-thieu" className="block text-lg font-medium text-gray-800">Giới thiệu</Link>
                
                <div>
                  <button onClick={() => toggleSubMenu(-1)} className="flex justify-between w-full text-lg font-medium text-gray-800 py-2 border-b">
                    Khóa học {openSubMenus[-1] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </button>
                  <AnimatePresence>
                    {openSubMenus[-1] && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pl-4 mt-2 space-y-2">
                        {Array.from(rootCategories.values()).map((category) => (
                          <div key={category.id}>
                            <button onClick={() => toggleSubMenu(category.id)} className="flex justify-between w-full text-gray-700 font-medium py-1">
                              {category.name} {childCategoriesMap.has(category.id) && <ChevronRight className="h-4 w-4" />}
                            </button>
                            {openSubMenus[category.id] && childCategoriesMap.has(category.id) && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pl-4 mt-1 space-y-1">
                                {childCategoriesMap.get(category.id).map((childCat: any) => (
                                  <MenuLinkSub key={childCat.id} href={`/khoa-hoc?type=${childCat.slug}`} label={childCat.name} activeLink={activeLink} />
                                ))}
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link href="/tin-tuc" className="block text-lg font-medium text-gray-800">Blog</Link>
                <Link href="/lien-he" className="block text-lg font-medium text-gray-800">Liên hệ</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}