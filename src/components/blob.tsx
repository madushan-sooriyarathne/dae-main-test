import { forwardRef } from "react";
import { cva, type VariantProps } from "cva";
import { type HTMLMotionProps, m } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { generateRandomPath } from "@utils/base";

const clipPath = cva(["w-[400px] h-[400px] "], {
  variants: {
    intent: {
      primary: "bg-blurPrimary",
      water: "bg-blurWater",
      land: "bg-blurLand",
      primaryWater: "bg-blurPrimaryWater",
      primaryLand: "bg-blurPrimaryLand",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface Props extends VariantProps<typeof clipPath>, HTMLMotionProps<"div"> {
  points?: number;
  size?: number; // size in pixels
}

const Blob = forwardRef<HTMLDivElement, Props>(
  ({ intent, points = 10, className, size = 400, ...props }, ref) => {
    return (
      <m.div
        ref={ref}
        {...props}
        className={twMerge(
          "absolute top-1/3 right-1/3 blur-[120px]",
          className
        )}
      >
        <div
          className={clipPath({ intent })}
          style={{
            clipPath: `polygon(${generateRandomPath(points)})`,
            width: `min(100%, ${size}px)`,
            height: size,
          }}
        ></div>
      </m.div>
    );
  }
);
Blob.displayName = "Blob";

export { Blob };
