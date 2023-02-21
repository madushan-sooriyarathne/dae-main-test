import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { brand } from "site-data";

import { QuaternaryHeading } from "@components/headings/quaternary-heading";

import { fadeInBottom } from "@styles/animations";

const WhatsappWidget: React.FC = (): JSX.Element => {
  const [widgetOpen, setWidgetOpen] = useState<boolean>(false);

  const handleWidgetClick = useCallback(() => {
    if (widgetOpen) {
      setWidgetOpen(false);
    } else {
      // open the whatsapp link
      window.open(
        `https://api.whatsapp.com/send/?phone=+${
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          brand.whatsapp.url.split("+")[1]
        }&text=I%27m+Interested+in+The+Marina+by+Debug+Auto+Exclusive.+I+need+to+know+more.+&type=phone_number&app_absent=0`,
        "_blank"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setWidgetOpen(true);
    }, 10000);

    // Close after 10 seconds
    const closeTimeout = setTimeout(() => {
      setWidgetOpen(false);
    }, 20000);

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      <AnimatePresence>
        {widgetOpen && (
          <m.div
            variants={fadeInBottom}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-[calc(100%+1rem)] right-0 flex  w-[300px] flex-col items-center justify-start gap-y-5 rounded-md border border-black-300/30 bg-white px-3 py-5 shadow-lg shadow-black/20"
          >
            <div className="absolute right-5 bottom-0 h-3 w-3 translate-y-1/2 rotate-45 transform bg-white" />
            <QuaternaryHeading alignment="center" intent="secondary">
              Chat with us on WhatsApp
            </QuaternaryHeading>
            <div className="flex items-center justify-center gap-4">
              <a
                href={`https://api.whatsapp.com/send/?phone=+${
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  brand.whatsapp.url.split("+")[1]
                }&text=I%27m+Interested+in+The+Marina+by+Debug+Auto+Exclusive.+I+need+to+know+more.+&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 cursor-pointer items-center justify-start gap-x-2 rounded-md bg-[#25D366] px-3 py-2 font-sans text-xs font-semibold tracking-wide text-white no-underline transition-colors duration-200 hover:bg-[#049A3C]"
              >
                <svg className="h-5 w-5 fill-white">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-whatsapp" />
                </svg>
                Chat on WhatsApp
              </a>
              <button
                onClick={() => setWidgetOpen(false)}
                className="h-10 rounded-md bg-primary px-3 py-2 font-sans text-xs font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-primary-800"
              >
                Close
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleWidgetClick}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 outline-none"
      >
        <svg className="h-5 w-5 fill-white">
          <use xlinkHref="/assets/svg/sprites.svg#icon-whatsapp" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsappWidget;
