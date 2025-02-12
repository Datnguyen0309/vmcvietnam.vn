import { ModalProvider } from "@/components/layout/ModalContext";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import "@fontsource/roboto";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </QueryClientProvider>
  );
}
