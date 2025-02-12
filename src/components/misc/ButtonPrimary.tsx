import React, { ReactNode } from "react";

export const ButtonPrimary = ({
  children,
  addClass
}: {
  children: ReactNode;
  addClass: string;
}) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-gray-100 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-300 hover:shadow-lg transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

interface ButtonPrimaryProps {
  onClick?: () => void;
  children: React.ReactNode;
  addClass?: string;
}

export const ButtonPrimarys = ({
  onClick,
  children,
  addClass = ""
}: ButtonPrimaryProps) => {
  return (
    <button
      type="button"
      className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${addClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ButtonBanner = ({
  onClick,
  children,
  addClass = ""
}: ButtonPrimaryProps) => {
  return (
    <button
      type="button"
      className={`mt-4 sm:mt-8 lg:mb-10 px-6 py-4 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 ${addClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
