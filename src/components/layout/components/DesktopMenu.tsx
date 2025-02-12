import { getDataSetUp } from "@/utils/fetch-auth-odoo";
import dynamic from "next/dynamic";
import Link from "next/link";
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
        <div className="relative ">
          <Menu title="Khóa học" />
        </div>

        <div className="absolute left-0 mt-0 py-4 w-52 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible space-y-3 z-10">
          {data?.data?.map((link: any, index: number) => (
            <MenuLinkSub
              key={index}
              href={`/khoa-hoc?type=${link.slug}`}
              label={link.name}
              activeLink={activeLink}
            />
          ))}
        </div>
      </div>

      {renderMenuLinks([{ href: "/tin-tuc", label: "Blog" }])}
      {renderMenuLinks([{ href: "/lien-he", label: "Liên hệ" }])}
    </div>
  );
};
