import { type ReactNode, useEffect } from "react";

interface Props {
  id: string;
  onOutsideClick: () => void;
  children: ReactNode;
}

const OutsideClickHandler: React.FC<Props> = ({
  id,
  children,
  onOutsideClick,
}: Props): JSX.Element => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest(`#${id}`);
      if (!el) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  return <>{children}</>;
};

export { OutsideClickHandler };
