import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Sidebar = dynamic(() =>
  import("@/components/Sidebar").then((mod) => mod.Sidebar)
);

export const LayoutBottom = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto max-w-7xl ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{children}</div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
      <div></div>
    </div>
  );
};
