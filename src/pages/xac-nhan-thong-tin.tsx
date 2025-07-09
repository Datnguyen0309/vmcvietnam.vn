import { ConfirmInfo } from "@/components/confirm-info";
import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <>
      <NextSeo title="Xác nhận thông tin " description="Xác nhận thông tin " />
      <ConfirmInfo />
    </>
  );
};

export default Page;
