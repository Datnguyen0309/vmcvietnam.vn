import React from "react";

interface BadgeProps {
  title: string;
  icon: React.ReactNode;
}

export const SectionTitle = ({ title, icon }: BadgeProps) => {
  return (
    <div
      className="flex items-center space-x-2 bg-white shadow-lg rounded-full py-2 px-4 w-fit "
      style={{ boxShadow: "0px 4px 30px rgba(235, 114, 87, 0.27)" }}
    >
      <div className="text-orange-500">{icon}</div>
      <span className="text-[#EB5757] ">{title}</span>
    </div>
  );
};

export default SectionTitle;
