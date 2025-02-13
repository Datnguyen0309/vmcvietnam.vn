import Link from "next/link";
import { ReactNode } from "react";

export const MenuLink = ({
  href,
  label,
  activeLink,
  isScrolled
}: {
  href: string;
  label: string;
  activeLink: string | null;
  isScrolled: boolean;
}) => (
  <div className="relative">
    <Link href={href}>
      <span
        className={`menu-link ${activeLink === href ? "active" : ""} ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        {label}
      </span>
    </Link>
    <style jsx>{`
      .menu-link {
        position: relative;
        padding: 0.1rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
        color: inherit;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
      }

      .menu-link::after {
        content: "";
        display: block;
        width: 0;
        height: 3px;
        background-color: currentColor;
        transition: width 0.3s ease-in-out;
        margin-top: 2px;
      }

      .menu-link:hover::after,
      .menu-link.active::after {
        width: 100%;
      }

      .menu-link:hover,
      .menu-link.active {
        color: #463266; /* text-orange-500 */
      }
    `}</style>
  </div>
);

export const MenuLinkSub = ({
  href,
  label,
  activeLink
}: {
  href: string;
  label: ReactNode; 
  activeLink: string | null;
}) => (
  <div className="relative">
    <Link href={href}>
      <span
        className={`menu-link ${activeLink === href ? "active" : "#4a5568"}`}
      >
        {label}
      </span>
    </Link>
    <style jsx>{`
      .menu-link {
        position: relative;
        padding: 0.1rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
        color: #4a5568; /* text-gray-600 */
        text-decoration: none;
        display: inline-block;
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

      .menu-link:hover::after,
      .menu-link.active::after {
        width: 100%;
      }

      .menu-link:hover,
      .menu-link.active {
        color: #463266; /* text-orange-500 */
      }
    `}</style>
  </div>
);
