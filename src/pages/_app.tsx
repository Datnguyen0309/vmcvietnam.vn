import type { AppProps } from "next/app";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import "@fontsource/roboto";
import { StoreProvider } from "@/redux/store-provider";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false); // Chỉ khi component đã mount trên client-side, SSR sẽ false
  }, []);

  if (isSSR) {
    // Khi render từ server-side, không khôi phục từ LocalStorage
    return null;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer className="!top-20" position="top-right" autoClose={2000} />
          </Layout>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}
