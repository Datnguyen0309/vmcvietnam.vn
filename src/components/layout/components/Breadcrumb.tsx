import Link from "next/link";

interface IbreadcrumbProps {
  title: string;
  link: string;
  title2?: string;
}

export const Breadcrumb = ({ title, link, title2 }: IbreadcrumbProps) => {
  return (
    <ol className="flex items-center whitespace-nowrap">
      <li className="inline-flex items-center">
        <Link
          href="/"
          className="flex items-center text-md text-gray-500 hover:text-orange-500 focus:outline-none focus:text-orange-500"
        >
          Trang chủ
        </Link>
        <svg
          className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </li>
      <li className="inline-flex items-center">
        <Link
          href={link}
          className={`flex items-center text-md ${
            title2 ? "text-gray-500" : "text-orange-500"
          } hover:text-orange-500 focus:outline-none focus:text-orange-500`}
        >
          {title}
        </Link>
        {title2 && (
          <svg
            className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        )}
      </li>
      {title2 && (
        <li
          className="inline-flex items-center text-md font-semibold text-orange-500 truncate"
          aria-current="page"
        >
          {title2}
        </li>
      )}
    </ol>
  );
};
