import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { m, type HTMLMotionProps } from "framer-motion";

import { cn } from "@lib/clsx";

import { generateRandomPath } from "@utils/base";

const clipPath = cva(["w-[320px] h-[320px] sm:!w-[400px] sm:!h-[400px]"], {
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
}

const Blob = forwardRef<HTMLDivElement, Props>(
  ({ intent, points = 10, className, ...props }, ref) => {
    return (
      <m.div
        ref={ref}
        {...props}
        className={cn("absolute blur-[120px]", className)}
      >
        <div
          className={clipPath({ intent })}
          style={{
            clipPath: `polygon(${generateRandomPath(points)})`,
          }}
        ></div>
      </m.div>
    );
  }
);
Blob.displayName = "Blob";

export { Blob };
