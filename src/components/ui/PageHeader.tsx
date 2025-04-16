import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: string[];
  loading?: boolean;  // Add loading prop to control the skeleton loader
}

export const PageHeader = ({ title, breadcrumbs = [], loading = false }: PageHeaderProps) => {
  if (loading) {
    return (
      <div
        className="relative py-12 md:py-16"
        style={{
          backgroundImage: "url('/assets/bg_collection.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px"
        }}
      >
        <div
          className="absolute inset-0 bg-black/30"
          style={{
            zIndex: 1
          }}
        ></div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[200px]">
          {/* Skeleton loader for title */}
          <div className="w-40 h-6 bg-gray-300 animate-pulse mb-4"></div>

          {/* Skeleton loader for breadcrumbs */}
          <div className="flex justify-center items-center space-x-2 text-[16px] text-white/80">
            <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
            <span className="text-white/80">/</span>
            <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative py-12 md:py-16"
      style={{
        backgroundImage: "url('/assets/bg_collection.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px"
      }}
    >
      <div
        className="absolute inset-0 bg-black/30"
        style={{
          zIndex: 1
        }}
      ></div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[200px]">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          {title}
        </h1>
        {breadcrumbs.length > 0 && (
          <nav className="flex justify-center items-center space-x-2 text-[16px] text-white/80">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mr-2">/</span>}
                <Link
                  href={index === 0 ? "/" : "#"}
                  className="uppercase text-white"
                >
                  {crumb}
                </Link>
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};
