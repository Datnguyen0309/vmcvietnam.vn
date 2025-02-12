import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { BannerPage } from "../layout/components/BannerPage";
import { Breadcrumb } from "../layout/components/Breadcrumb";

const ListPosts = dynamic(() =>
  import("./ListPosts").then((mod) => mod.ListPosts)
);

export const News = () => {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tin-tuc?page=${selected + 1}`);
  };

  return (
    <div className="pb-40 bg-white">
      <BannerPage title="Tin tức" image={"/assets/bannergt.webp"} />
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto w-full text-start">
        <div className="py-4 border-b border-gray-200">
          <Breadcrumb title={"Tin tức"} link={"/tin-tuc"} />
        </div>
      </div>

      <div className="pt-8 max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto w-full">
        <ListPosts handleRouter={handleRouter} />
      </div>
    </div>
  );
};
