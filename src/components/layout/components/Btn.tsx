import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const CTAButton = ({
  type,
  link,
}: {
  type: string;
  link: string; // Đường dẫn được truyền vào
}) => {
  const isZalo = type === "zalo";

  return (
    <Link href={link} passHref>
      <div
        style={{
          position: "relative",
          width: "65px",
          height: "65px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            borderRadius: "50%",
            width: "100%",
            height: "100%",
            backgroundColor: isZalo
              ? "rgba(33, 150, 243, 0.5)"
              : "rgba(244, 67, 54, 0.5)",
            zIndex: 0, // Hiển thị dưới nút chính
          }}
          animate={{
            scale: [1, 1.5], // Sóng phóng to
            opacity: [0.7, 0], // Mờ dần
          }}
          transition={{
            duration: 1.3, // Thời gian hiệu ứng
            repeat: Infinity,
            repeatDelay: 0.7, // Độ trễ giữa các vòng lặp
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="cta-button"
          style={{
            boxShadow: `0 0 0 0 ${isZalo ? "#2196F3" : "#F44336"}`,
            backgroundColor: isZalo
              ? "rgba(33, 150, 243, 1)"
              : "rgba(244, 67, 54, 1)",
            borderRadius: "50%",
            width: "65px",
            height: "65px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1, // Đặt trên lớp sóng
          }}
          animate={{
            scale: [1, 0.8, 1], // Hiệu ứng zoom: nhỏ lại và trở về
            rotate: [0, -20, 20, 0], // Hiệu ứng lắc
          }}
          transition={{
            scale: {
              duration: 2, // Thời gian chu kỳ (1 thu nhỏ, 1 phóng to)
              repeat: Infinity,
              ease: "easeInOut",
            },

            rotate: {
              duration: 0.5, // Lắc nhanh hơn
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src={isZalo ? "/assets/Icon/zalo.png" : "/assets/Icon/phone.png"}
            alt={isZalo ? "Zalo Icon" : "Phone Icon"}
            width={30}
            height={30}
          />
        </motion.div>
      </div>
    </Link>
  );
};
