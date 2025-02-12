import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { InputSearch } from "./InputSearch";

export const Buttonsearch = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className={`p-2  hover:text-orange-500 focus:outline-none  ${
            isScrolled ? "text-black" : "text-white"
          }`}
          aria-label="Search database"
          onClick={onToggle}
        >
          <IoSearch fontSize="24px" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 p-2 bg-gray-300 rounded shadow-lg z-50 w-[300px]">
            <InputSearch onClose={onClose} />
          </div>
        )}
      </div>
    </>
  );
};
