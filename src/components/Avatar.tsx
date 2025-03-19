import type React from "react";

interface AvatarProps {
  fallback: string;
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ fallback, className = "", children }) => {
  return (
    <div className={`flex items-center justify-center rounded-full bg-[#e5e5e5] ${className}`}>
      {children || <span className="text-[#999] font-semibold">{fallback}</span>}
    </div>
  );
};

// AvatarFallback không cần thiết nữa, chúng ta có thể loại bỏ nó
