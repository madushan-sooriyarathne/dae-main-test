import { type ReactNode } from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { fadeIn } from "@styles/animations";

interface Props {
  tabs: { value: string; content: ReactNode | ReactNode[] }[];
}

const TabsPane: React.FC<Props> = ({ tabs }: Props): JSX.Element => {
  return (
    <div className="w-full">
      <TabsPrimitive.Root
        defaultValue={tabs[0]?.value}
        className="flex flex-col items-center justify-start gap-y-12"
      >
        <TabsPrimitive.List
          className={cn(
            "mx-4 flex max-w-full flex-wrap items-center justify-center gap-x-1 rounded-md bg-white-200 p-1 md:gap-x-2 md:p-2 lg:gap-x-4"
          )}
        >
          {tabs.map((tab) => (
            <TabsPrimitive.Trigger
              value={tab.value}
              key={tab.value}
              className={cn(
                "inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5 font-sans text-sm font-semibold text-black-800 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm md:px-4 md:py-2 md:text-base lg:text-lg xl:text-xl 2xl:px-5 2xl:py-3 2xl:text-3xl"
              )}
            >
              {tab.value}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            <TabsPrimitive.Content
              value={tab.value}
              key={`content-${tab.value}`}
              className="w-full"
              asChild
            >
              <m.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="overflow-hidden rounded-3xl bg-white-200 py-12 xl:py-16"
              >
                <div className="flex w-full flex-col items-stretch justify-start gap-y-20 2xl:gap-y-24 4xl:gap-y-36">
                  {tab.content}
                </div>
              </m.div>
            </TabsPrimitive.Content>
          ))}
        </AnimatePresence>
      </TabsPrimitive.Root>
    </div>
  );
};

export { TabsPane };
