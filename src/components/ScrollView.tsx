import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const ScrollView = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5 // Kích hoạt khi 50% của phần tử hiển thị trong viewport
  });

  useEffect(() => {
    // Kiểm tra xem trongView và isVisible đều là true
    if (inView && !isVisible) {
      setIsVisible(true); // Nếu không thì hiển thị
    }
  }, [inView, isVisible]);
  return <div ref={ref}>{isVisible && <>{children}</>}</div>;
};

export const ScrollViews = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref: scrollViewsRef, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  return <div ref={scrollViewsRef}>{isVisible && <>{children}</>}</div>;
};
