"use client";

import { deleteSpace } from "@/utils/deleteSpace";
import { toSlug } from "@/utils/toSlug";
import Image from "next/image";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { ListSearchPosts } from "./ListSearchPosts";

export const Search = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [keyWord, setKeyWord] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tim-kiem?keyword=${keyWord}&page=${selected + 1}`);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });

    if (str !== "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    } else {
      setIsCorrect(true);
    }
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery !== "" && str === "") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const { keyword } = router.query;
    setKeyWord(
      Array.isArray(keyword) ? keyword[0] || "" : (keyword as string) || ""
    );
  }, [router.query]);

  return (
    <>
      <div className="relative h-[350px] w-full m-auto">
        <Image
          src={"/assets/bannergt.webp"}
          width={1920}
          height={603}
          alt="banner"
          className="w-full h-full bg-bottom bg-cover duration-500"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="absolute top-[100px] left-0 w-full">
          <div className="pt-16">
            <form onSubmit={onSearch}>
              <div className="flex justify-center space-x-0">
                <input
                  required
                  value={searchQuery}
                  type="text"
                  className="border border-white rounded-l-2xl bg-white text-black max-w-2xl h-12 p-4 focus:border-blue-500"
                  placeholder="Nhập vào từ khóa..."
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-r-2xl h-12 px-6 transition-colors duration-400 hover:bg-black hover:text-white"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
          {isCorrect && (
            <div className="pt-1 flex justify-center text-red-600">
              <span>Từ khóa tìm kiếm không hợp lệ</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16">
        <div className="min-h-[300px]">
          {keyWord !== "" && (
            <>
              <h1 className="text-4xl text-[#07294d] pb-10 text-center">
                Kết quả trả về cho từ khóa : {deleteSpace(keyWord)}
              </h1>
              <ListSearchPosts handleRouter={handleRouter} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
