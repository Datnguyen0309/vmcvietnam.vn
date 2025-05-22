"use client";

import { useEffect, useState } from "react";

export const useSize = () => {
  const hasWindow = typeof window !== "undefined";

  const getSize = () => ({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.scrollY : 0
  });

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    if (!hasWindow) return;

    const handleResize = () => {
      setSize((prev) => ({
        ...prev,
        width: window.innerWidth
      }));
    };

    const handleScroll = () => {
      setSize((prev) => ({
        ...prev,
        height: window.scrollY
      }));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Cleanup listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasWindow]);

  return { size };
};
