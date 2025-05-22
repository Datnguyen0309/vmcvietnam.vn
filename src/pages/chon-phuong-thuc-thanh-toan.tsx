import { PaymentMethod } from "@/components/payment-method";
import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <>
          <NextSeo
            title="Chọn phương thức thanh toán   "
            description="Chọn phương thức thanh toán "
          />
      <PaymentMethod />
    </>
  );
};

export default Page;
