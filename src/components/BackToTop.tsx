import Image from "next/image";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const toggleHeight = window.innerHeight * 0.6;

    const handleScroll = () => {
      if (window.scrollY > toggleHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-32 right-8 w-9 h-9 z-50 bg-gray-800 text-white border-2 border-gray-300 shadow-md flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out ${
        showButton ? "opacity-100" : "opacity-0"
      } ${showButton ? "translate-y-0" : "translate-y-10"}  hover:orange]`}
      onClick={scrollToTop}
    >
      <Image
        alt="Back to top"
        src="/assets/ss-up.svg"
        width={64}
        height={64}
        style={{ width: "20px", height: "auto" }}
      />
    </div>
  );
};
