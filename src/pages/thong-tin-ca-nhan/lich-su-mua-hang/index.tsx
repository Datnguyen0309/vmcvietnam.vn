"use client";

import { OrderHistoryPage } from "@/components/orderHistory";
import { NextSeo } from "next-seo";

const OrderHistory = () => {
  return (
    <>
      <NextSeo title="Lịch sử mua hàng" description="Lịch sử mua hàng" />
      <OrderHistoryPage />
    </>
  );
};

export default OrderHistory;
