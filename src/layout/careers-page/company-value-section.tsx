import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { clamp } from "@utils/base";

import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

import { fadeIn } from "@styles/animations";

interface Props {
  values: CompanyValue[];
}

const CompanyValueSection: React.FC<Props> = ({
  values,
}: Props): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const paginate = useCallback(() => {
    setSelectedValue((prev) => clamp(0, values.length, prev + 1));
  }, [values.length]);

  const handleValueItemClick = (index: number) => {
    setSelectedValue(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(paginate, 7000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(paginate, 7000);

    return () => clearInterval(intervalRef.current);
  }, [paginate, values.length]);

  return (
    <section className="main-grid-columns grid">
      <div className="col-content grid grid-cols-1 items-start justify-items-start gap-y-8 lg:grid-cols-[1fr_60%] lg:gap-x-9">
        <div className="row-start-2 flex w-full flex-wrap items-stretch justify-center gap-4 lg:row-start-1 lg:flex-col lg:justify-start">
          {values.map((val, index) => (
            <button
              key={val.id}
              onClick={() => handleValueItemClick(index)}
              className={cn(
                "group relative flex w-full max-w-[25rem] flex-col items-start justify-start gap-y-3 rounded border border-white-400 bg-white-100 p-4 transition-colors duration-200 ease-in-out hover:bg-white-200 lg:max-w-[31.25rem] lg:gap-y-4",
                {
                  "border-water bg-white-200 shadow-lg shadow-water/20":
                    index === selectedValue,
                }
              )}
            >
              <QuaternaryHeading alignment="left" intent="secondary">
                {val.name}
              </QuaternaryHeading>
              <Paragraph alignment="left" intent="black">
                {val.description}
              </Paragraph>
              <object
                aria-label="background gradient shadow"
                data="/assets/svg/gradient-shadow.svg"
                className="absolute right-0 left-0 top-full w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
              />
            </button>
          ))}
        </div>
        <div className="relative row-start-1 row-end-2 aspect-[4/3] w-full overflow-hidden rounded md:aspect-video lg:aspect-auto lg:h-full">
          <AnimatePresence>
            {values.map(
              (val, index) =>
                index === selectedValue && (
                  <m.div
                    className="absolute inset-0"
                    key={val.id}
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <ImageComponent image={val.image} />
                  </m.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export { CompanyValueSection };
