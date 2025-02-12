import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BackToTop } from "../BackToTop";
import { CTA } from "./components/Cta";

const Footer = dynamic(() =>
  import("@/components/layout/Footer").then((mod) => mod.Footer)
);
const Header = dynamic(() =>
  import("@/components/layout/Header").then((mod) => mod.Header)
);

const Layout = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="bg-white ">
        {children}
        <div ref={ref} className="h-[1px]" />
        <CTA />
      </main>
      <BackToTop />
      {inView && <Footer />}
    </>
  );
};

export default Layout;
