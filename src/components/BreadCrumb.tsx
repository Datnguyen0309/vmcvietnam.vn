import Link from "next/link";

export const BreadCrumb = ({ page }: { page?: string }) => {
  return (
    <div>
      <div className=" h-[190px] py-[50px] bg-[url('/b.png')]  bg-[#faf6f6e6] flex flex-col items-center justify-center gap-2">
        <p className=" text-[28px] xl:text-[42px] text-center text-Dark-Blue font-bold mb-[15px]">
          {page}
        </p>
        <div className="flex items-center justify-center px-[10px] md:px-0 gap-2">
          <Link href="/" className="text-[16px] text-Dark-Blue font-medium">
            Trang chủ
          </Link>
          <p className="font-medium text-[#4A306D]">-</p>
          <p className="text-[16px] text-Dusky-Lavender font-medium">{page}</p>
        </div>
      </div>
    </div>
  );
};
