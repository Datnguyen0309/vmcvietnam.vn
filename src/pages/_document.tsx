import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta name="google-site-verification" content="5YaPIhFTpKXwP8RFtq6lPfmjDU8QwwaJy_gkUDiWM1Y" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Plus+Jakarta+Sans:wght@200..800&family=Roboto:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NNF45LPF"
        />
      </Head>
      <body className="bg-white text-gray-800">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNF45LPF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
