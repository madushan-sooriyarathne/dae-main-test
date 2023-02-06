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
          className="fixed bottom-5 right-5 z-[190] flex h-14 w-14 items-center justify-center rounded border border-black-400/50 bg-white p-2 shadow-sm transition-[box-shadow] hover:shadow-md"
        >
          <svg className="h-6 w-6 fill-black-700 transition-[fill] duration-200 hover:fill-black-900">
            <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-top-short" />
          </svg>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export { Floater };
