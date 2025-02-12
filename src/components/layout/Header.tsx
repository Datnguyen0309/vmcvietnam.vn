"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderTop from "./components/HeaderTop";
import { Phone } from "lucide-react";
import MobileMenu from "./components/MobileMenu";
import { motion } from "framer-motion";

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

  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="hidden sm:block">
          <HeaderTop headerTop={homeContent?.acf?.header_top} />
        </div>
        <nav className="max-w-7xl mx-auto py-3 sm:py-4 bg-white hidden sm:grid lg:flex lg:justify-between grid-flow-col">
          <div className="col-start-1 col-end-2 items-center py-2 hidden md:flex">
            <Logo logo={homeContent?.acf?.header?.logo} />
          </div>
          <div className="col-start-10 col-end-13 flex items-center ">
            <DesktopMenu
              activeLink={state.activeLink}
              isScrolled={state.isScrolled}
            />
            <motion.button
              className="hidden text-sm md:flex items-center gap-2 bg-gradient-to-r from-[#B7042D] to-[#E65F1D] p-2 rounded-[99px] text-white ml-5"
              animate={{ scaleX: [1, 1.2, 1] }}
              initial={{ scaleX: 1 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                playState: "running"
              }}
            >
              <Phone className="h-4 w-4" />
              {homeContent?.acf?.header?.phone || "028 9999 8899"}
            </motion.button>
          </div>
        </nav>
        <MobileMenu logo={homeContent?.acf?.header?.logo}  activeLink={state.activeLink}
              isScrolled={state.isScrolled} />
      </header>
      <div className="pt-[50px] sm:pt-[150px]"></div>
    </>
  );
};
