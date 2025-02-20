"use client";

import { useAppSelector } from "@/redux/store";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ShoppingCartButton from "../ui/CartButton";
import { HeaderTop } from "./components/HeaderTop";
import MobileMenu from "./components/MobileMenu";

const Logo = dynamic(() => import("@/components/Logo").then((mod) => mod.Logo));

const DesktopMenu = dynamic(() =>
  import("@/components/layout/components/DesktopMenu").then(
    (mod) => mod.DesktopMenu
  )
);

export const Header = () => {
  const [state, setState] = useState({
    activeLink: null as string | null,
    isMenuOpen: false,
    isScrolled: false
  });

  const router = useRouter();
  const [homeContent, setHomeContent] = useState<any>(null);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setState((prevState) => ({ ...prevState, activeLink: url }));
    };

    handleRouteChange(router.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setState((prevState) => ({
        ...prevState,
        isScrolled: window.scrollY > 40
      }));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md header-container">
        <div className="hidden sm:block z-70">
          <HeaderTop headerTop={homeContent?.acf?.header_top} />
        </div>
        <nav className="max-w-7xl mx-auto py-3 sm:py-4 bg-white hidden lg:flex items-center justify-between px-6 lg:px-1 z-50">
          <Logo logo={homeContent?.acf?.header?.logo} />
          <DesktopMenu activeLink={state.activeLink} isScrolled={state.isScrolled} />
          <div className="search-box">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#B7042D] to-[#E65F1D] px-3 py-2 rounded-full text-white text-sm ml-5"
            animate={{ scaleX: [1, 1.2, 1] }}
            initial={{ scaleX: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Phone className="h-4 w-4" />
            {homeContent?.acf?.header?.phone || "028 9999 8899"}
          </motion.button>
          <Link href="/gio-hang" className="relative">
            <ShoppingCartButton itemCount={totalQuantity} />
          </Link>
        </nav>
      </header>
      <div className="lg:hidden">
        <MobileMenu
          logo={homeContent?.acf?.header?.logo}
          activeLink={state.activeLink}
        />
      </div>
      <div className="pt-[50px] sm:pt-[80px] lg:pt-[120px]"></div>
    </>
  );
};
