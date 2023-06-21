// import { useEffect, useState } from "react";

import { useEffect } from "react";
import { type AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, LazyMotion } from "framer-motion";

import { env } from "@env/client.mjs";
import { gtmTrackPageView } from "@lib/gtm";
import { queryClient } from "@lib/react-query";

import { NotificationProvider } from "@context/notification";
import { api } from "@utils/api";

import { plusJakartaSans } from "@styles/fonts";

// 3rd Party styles
import "@styles/globals.css";
import "keen-slider/keen-slider.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

// import { LoadingScreen } from "@layout/common/loading-screen";

const loadMotionFeatures = () =>
  import("@styles/motion-features").then((res) => res.animationFeatures);

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const handleLoading = () => {
  //     setLoading(false);
  //   };

  //   window.addEventListener("load", handleLoading);

  //   const timeout = setTimeout(handleLoading, 3000);

  //   return () => {
  //     window.removeEventListener("load", handleLoading);
  //     clearTimeout(timeout);
  //   };
  // }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtmTrackPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Marina by Debug Auto Exclusive</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      {/* Create data layer */}
      <Script id="data-layer" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>

      {/* Google Tag Manager Base Code */}
      <Script
        id="gtag-base"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
      />
      <LazyMotion features={loadMotionFeatures} strict>
        <QueryClientProvider client={queryClient}>
          <div className={`${plusJakartaSans.variable} font-sans`} id="app">
            {/* <AnimatePresence>
            {loading &&   <LoadingScreen key="loading-screen" />}
            </AnimatePresence> */}
            <NotificationProvider>
              <AnimatePresence>
                <Component {...pageProps} />
              </AnimatePresence>
            </NotificationProvider>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LazyMotion>
    </>
  );
};

export default api.withTRPC(MyApp);
