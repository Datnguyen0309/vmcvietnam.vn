import EventsPage from "@/components/su-kien/eventsPage";

import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <>
      <NextSeo title="Sự kiện " description="Bạn đã thanh toán thành công" />
      <EventsPage />
    </>
  );
};

export default Page;
