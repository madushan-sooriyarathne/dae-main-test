import { type AppType } from "next/app";

import { api } from "../utils/api";
// 3rd Party styles

import { playfairDisplay, plusJakartaSans } from "@styles/fonts";
import "@styles/globals.css";
import "keen-slider/keen-slider.min.css";
import { LazyMotion } from "framer-motion";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@lib/react-query";

const loadMotionFeatures = () =>
  import("@styles/motion-features").then((res) => res.domAnimation);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <QueryClientProvider client={queryClient}>
        <style jsx global>
          {`
            :root {
              --primary-font: ${plusJakartaSans.style.fontFamily};
              --secondary-font: ${playfairDisplay.style.fontFamily};
            }
          `}
        </style>

        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </LazyMotion>
  );
};

export default api.withTRPC(MyApp);
