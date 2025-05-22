"use client";

import { toSlug } from "@/utils/toSlug";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface InputSearchProps {
  onClose: () => void;
}

export const InputSearch = ({ onClose }: InputSearchProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInput, setCheckInput] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });
    if (str !== "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
      onClose();
    }
    setSearchQuery("");
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery !== "" && str === "") {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
  }, [searchQuery]);

  return (
    <div className="z-50">
      <form onSubmit={onSearch}>
        <div className="flex items-center space-x-2">
          <input
            required
            className="bg-white text-black border border-gray-400 rounded-l px-4 py-2 w-full"
            value={searchQuery}
            placeholder="Tìm kiếm..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-r  py-2 transition-colors hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-600"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      {checkInput && (
        <div className="pt-2 text-red-600 text-center">
          Từ khóa tìm kiếm không hợp lệ
        </div>
      )}
    </div>
  );
};
