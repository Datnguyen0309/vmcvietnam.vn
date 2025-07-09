import Layout from "@/components/layout";
import { ModalProvider } from "@/components/layout/ModalContext";
import { StoreProvider } from "@/redux/store-provider";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import "@fontsource/roboto";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer className="!top-20" position="top-right" autoClose={2000} />
          </Layout>
        </StoreProvider>
      </QueryClientProvider>
    </ModalProvider>
  );
}
