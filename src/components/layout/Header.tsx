import { useAppSelector } from "@/redux/store";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Logo } from "../Logo";
import ShoppingCartButton from "../ui/CartButton";
import { DesktopMenu } from "./components/DesktopMenu";
import { HeaderTop } from "./components/HeaderTop";
import MobileMenu from "./components/MobileMenu";

export const Header = () => {
  const [state, setState] = useState({
    activeLink: null as string | null,
    isMenuOpen: false,
    isScrolled: false,
  });

  const [homeContent, setHomeContent] = useState<any>(null);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


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
      setState((prev) => ({ ...prev, activeLink: url }));
    };

    handleRouteChange(router.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setState((prev) => ({
        ...prev,
        isScrolled: window.scrollY > 40
      }));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push({
        pathname: "/khoa-hoc",
        query: { key: encodeURIComponent(searchQuery.trim()) },
      });
    }
  };

  return (
    <>
      <header className={`bg-white fixed top-0 left-0 w-full z-50 header-container transition-shadow duration-300 ${state.isScrolled ? 'shadow-md' : ''}`}>
        <div className="z-70">
          <HeaderTop headerTop={homeContent?.acf?.header_top} />
        </div>
        <nav className="max-w-7xl mx-auto py-3 sm:py-4 bg-white hidden xl:flex items-center justify-between px-6 xl:px-1 z-50">
          <Logo logo={homeContent?.acf?.header?.logo} />
          <DesktopMenu activeLink={state.activeLink} isScrolled={state.isScrolled} />
          <form onSubmit={handleSearch} className="relative flex items-center w-[300px] border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <input
              type="text"
              placeholder="Tìm khóa học..."
              className="w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-gray-500">
              <FiSearch className="h-5 w-5" />
            </button>
          </form>
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
          {isClient && <ShoppingCartButton itemCount={totalQuantity} />}
          </Link>
        </nav>
      </header>

      <div className="xl:hidden force-mobile bg-white sticky top-[50px] py-5 md:py-10 lg:py-10 z-[40]">
        <MobileMenu
          logo={homeContent?.acf?.header?.logo}
          activeLink={state.activeLink}
        />
      </div>

      <div className="xl:pt-[140px] pt-[50px]"></div>
    </>
  );
};
