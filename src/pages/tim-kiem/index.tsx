"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/layout";
import { Search } from "@/components/search";

const Page = () => {
  return (
    <>
        <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
          <Search />
        </ErrorBoundary>
    </>
  );
};

export default Page;
