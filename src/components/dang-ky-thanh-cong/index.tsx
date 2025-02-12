import Image from "next/image";

export const DangkyTc = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mt-20 md:mt-24 lg:mt-20">
      <h1 className="text-3xl text-red-500 py-10 text-center">
        Đăng ký thành công!
      </h1>
      <p className="text-center font-semibold text-black py-4">
        Cảm ơn bạn đã đăng ký, cán bộ tư vấn của trường sẽ liên hệ với bạn trong
        thời gian sớm nhất!
      </p>
      <div className="pt-10">
        <Image
          src="/assets/dktc.jpg"
          width={1080}
          height={1080}
          alt="Van ban he tu xa "
          style={{ height: "auto", width: "auto" }}
        />
      </div>
    </div>
  );
};
