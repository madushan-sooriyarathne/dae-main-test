import { type AppType } from "next/app";

// 3rd Party styles

import { playfairDisplay, plusJakartaSans } from "@styles/fonts";

import { api } from "../utils/api";

import "@styles/globals.css";
import "keen-slider/keen-slider.min.css";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion } from "framer-motion";

const loadMotionFeatures = () =>
  import("@styles/motion-features").then((res) => res.animationFeatures);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans`}
        >
          <Component {...pageProps} />
        </div>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </LazyMotion>
  );
};

export default api.withTRPC(MyApp);
