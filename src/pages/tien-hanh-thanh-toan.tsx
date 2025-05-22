import { PaymentProcessingPage } from "@/components/payment-processing";
import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <>
      <NextSeo title="Tiến hành thanh toán " description="Tiến hành thanh toán " />
      <PaymentProcessingPage />
    </>
  );
};

export default Page;