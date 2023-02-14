import { fadeInBottom } from "@styles/animations";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";

const Floater: React.FC = (): JSX.Element => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <m.div
          variants={fadeInBottom}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-24 z-[190] flex h-14 w-14 items-center justify-center overflow-hidden rounded border border-black-400/50 bg-white p-2 shadow-sm transition-[box-shadow] hover:shadow-md"
        >
          <div className="absolute top-0 left-0 -z-10 h-12 w-12 -translate-x-1/3 -translate-y-1/2 transform rounded-full bg-water-300 blur-[20px]" />
          <svg className="h-6 w-6 fill-black-700 transition-[fill] duration-200 hover:fill-black-900">
            <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-top-short" />
          </svg>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export { Floater };
