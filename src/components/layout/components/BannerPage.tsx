import Image from "next/image";
interface BannerPageProps {
  title: string;
  image: string;
}
export const BannerPage = ({ title, image }: BannerPageProps) => {
  return (
    <>
      <div className="relative h-[300px] w-full m-auto">
        <Image
          src={image || "/assets/bannergt.webp"}
          width={1920}
          height={603}
          alt="banner"
          className="w-full h-full bg-bottom bg-cover duration-500"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto w-full text-start">
          <div className="absolute bottom-16 flex items-center justify-center">
            <div
              className="lg:inline-block hidden"
              style={{
                height: "52px",
                width: "3px",
                background: "orange"
              }}
            ></div>
            <h1
              className="text-white text-2xl lg:text-4xl font-bold ml-8 "
              style={{ lineHeight: "52px" }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
