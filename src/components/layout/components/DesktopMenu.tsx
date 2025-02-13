import { getDataSetUp } from "@/utils/fetch-auth-odoo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";

const MenuLink = dynamic(() =>
  import("@/components/layout/components/MenuLink").then((mod) => mod.MenuLink)
);
const MenuLinkSub = dynamic(() =>
  import("@/components/layout/components/MenuLink").then(
    (mod) => mod.MenuLinkSub
  )
);

const Menu = ({ title }: { title: string }) => {
  return (
    <>
      <Link href={"/khoa-hoc"}>
        <div className={"menu-link"}>
          <span className="flex items-center">
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down ml-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </span>
        </div>
      </Link>
      <style jsx>{`
        .menu-link {
          position: relative;
          padding: 0.1rem 1rem;
          margin: 0 0.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: color 0.3s ease-in-out;
          font-weight: 600;
        }

        .menu-link:hover {
          color: #463266;
        }

        .menu-link::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease-in-out;
          margin-top: 2px;
        }

        .menu-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export const DesktopMenu = ({
  activeLink,
  isScrolled
}: {
  activeLink: string | null;
  isScrolled: boolean;
}) => {
  const { data, isLoading } = useQuery("getListCate", () =>
    getDataSetUp({
      root: "product",
      type: "product-categories"
    })
  );

  let rootCategories = new Map();
  let childCategoriesMap = new Map();

  data?.data?.forEach((category: any) => {
    if (!category.parent_category) {
      rootCategories.set(category.id, category);
    } else {
      if (!childCategoriesMap.has(category.parent_category.id)) {
        childCategoriesMap.set(category.parent_category.id, []);
      }
      childCategoriesMap.get(category.parent_category.id).push(category);
    }
  });
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const renderMenuLinks = (links: { href: string; label: string }[]) =>
    links.map((link) => (
      <MenuLink
        key={link.href}
        href={link.href}
        label={link.label}
        activeLink={activeLink}
        isScrolled={isScrolled}
      />
    ));

  return (
    <div className="hidden lg:flex col-start-4 col-end-8 items-center">
      {renderMenuLinks([
        { href: "/", label: "Trang chủ" },
        { href: "/gioi-thieu", label: "Giới thiệu" },

      ])}

      <div className="relative group">
        <Menu title="Khóa học" />

        <div className="absolute left-0 mt-0 py-4 w-52 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible space-y-3 z-10">
        {Array.from(rootCategories.values()).map((category) => (
  <div
    key={category.id}
    className="relative group"
    onMouseEnter={() => setHoveredCategory(category.id)}
    onMouseLeave={() => setHoveredCategory(null)}
  >
    <MenuLinkSub
      href={`/khoa-hoc?type=${category.slug}`}
      label={
        <span className="flex justify-between items-center w-full">
          {category.name}
          {childCategoriesMap.has(category.id) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-chevron-right ml-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L11.293 7.5 6.646 2.854a.5.5 0 0 1 0-.708"
              />
            </svg>
          )}
        </span>
      }
      activeLink={activeLink}
    />

    {childCategoriesMap.has(category.id) && hoveredCategory === category.id && (
      <div className="absolute left-full top-0 mt-0 py-4 w-52 bg-white border border-gray-200 rounded shadow-lg space-y-3 z-10">
        {childCategoriesMap.get(category.id).map((childCat: any) => (
          <div key={childCat.id} className="relative">
            <MenuLinkSub
              href={`/khoa-hoc?type=${childCat.slug}`}
              label={childCat.name}
              activeLink={activeLink}
            />
          </div>
        ))}
      </div>
    )}
  </div>
))}

        </div>
      </div>

      {renderMenuLinks([{ href: "/tin-tuc", label: "Blog" }])}
      {renderMenuLinks([{ href: "/lien-he", label: "Liên hệ" }])}
    </div>
  );
};
