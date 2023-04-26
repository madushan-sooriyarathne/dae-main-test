import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { Button } from "@components/button";
import { TertiaryHeading } from "@components/headings/tertiary-heading";

import { fadeInBottom } from "@styles/animations";

const CookieConsent: React.FC = (): JSX.Element => {
  const [cookieDialogOpen, setCookieDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (Boolean(localStorage.getItem("cookies-accepted"))) {
      setCookieDialogOpen(false);
    } else {
      setTimeout(() => setCookieDialogOpen(true), 3000);
    }
  }, []);
  const handleAccept = () => {
    setCookieDialogOpen(false);
    localStorage.setItem("cookies-accepted", "true");
  };
  return (
    <AnimatePresence>
      {cookieDialogOpen && (
        <m.div
          variants={fadeInBottom}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-3 left-3 right-3 z-[210] flex w-[min(28rem,_calc(100%-24px))] flex-col items-stretch justify-between gap-y-6 rounded bg-white p-3 pt-10 drop-shadow-[0_0_30px_hsla(358,85%,55%,0.4)] @container/dialog md:p-4 md:pt-12"
        >
          <object
            data="/assets/svg/cookie.svg"
            className="absolute top-0 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform md:h-16 md:w-16"
          />
          <div className="flex flex-col items-center justify-start gap-y-3">
            <TertiaryHeading alignment="center" intent="secondary">
              Cookies!
            </TertiaryHeading>
            <p className="text-center font-sans text-sm font-medium tracking-wide text-black-700">
              We use cookies to make your experience better.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-x-3 gap-y-3 @sm:flex-row">
            <Button
              fullWidth
              type="link"
              link="https://dae.fun/privacy-policy"
              outline
              external
            >
              Privacy Policy
            </Button>
            <Button
              fullWidth
              type="action"
              onClick={handleAccept}
              intent="primary"
              solid
            >
              Okay
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export { CookieConsent };
