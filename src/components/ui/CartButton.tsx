import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface ShoppingCartButtonProps {
  itemCount: number;
}

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({ itemCount }) => {
  return (
    <button
      className="relative  bg-slate-100 text-[#685F78] rounded-full transition-all duration-300 ease-in-out transform w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <FaShoppingCart className="w-4 h-4 xl:w-5 xl:h-5 text-[#685F78]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-Blush-Pink text-black text-xs font-bold rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center ">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default ShoppingCartButton;
