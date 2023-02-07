// import { useEffect, useState } from "react";
import { type AppType } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, LazyMotion } from "framer-motion";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "../utils/api";
import { queryClient } from "@lib/react-query";
import { NotificationProvider } from "@context/notification";

import { playfairDisplay, plusJakartaSans } from "@styles/fonts";

// 3rd Party styles
import "@styles/globals.css";
import "keen-slider/keen-slider.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

// import { LoadingScreen } from "@layout/common/loading-screen";

const loadMotionFeatures = () =>
  import("@styles/motion-features").then((res) => res.animationFeatures);

const MyApp: AppType = ({ Component, pageProps }) => {
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

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans`}
          id="app"
        >
          {/* <AnimatePresence>
            {loading && <LoadingScreen key="loading-screen" />}
          </AnimatePresence> */}
          <NotificationProvider>
            <AnimatePresence>
              <Component {...pageProps} />
            </AnimatePresence>
          </NotificationProvider>
        </div>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </LazyMotion>
  );
};

export default api.withTRPC(MyApp);
