import type { ReactNode } from "react";
import useMeasure from "react-use-measure";
import { m, MotionConfig } from "framer-motion";

interface Props {
  children: ReactNode;
}

const ResizablePanel: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [ref, { height }] = useMeasure();

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <m.div animate={{ height: height }} className="w-full">
        <div ref={ref} className="w-full">
          {children}
        </div>
      </m.div>
    </MotionConfig>
  );
};

export { ResizablePanel };
