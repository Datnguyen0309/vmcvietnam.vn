import { PaymentSuccessPage } from "@/components/payment-success";
import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <>
      <NextSeo title="Thanh toán thành công" description="Bạn đã thanh toán thành công" />
      <PaymentSuccessPage />
    </>
  );
};

export default Page;
