import { useEffect, useRef, useState } from "react";

export const useScrollDirection = () => {
  const prevScrollPos = useRef<number>(0);
  const [direction, setDirection] = useState<-1 | 1 | 0>(0);
  useEffect(() => {
    const handleScrollUpdate = () => {
      if (prevScrollPos.current > window.scrollY) {
        setDirection(-1);
      } else if (prevScrollPos.current === window.scrollY) {
        setDirection(0);
      } else {
        setDirection(1);
      }

      prevScrollPos.current = window.scrollY;
    };
    handleScrollUpdate();
    window.addEventListener("scroll", handleScrollUpdate);

    return () => window.removeEventListener("scroll", handleScrollUpdate);
  }, []);

  return direction;
};
