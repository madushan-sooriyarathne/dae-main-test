import { cn } from "@lib/clsx";

interface Props {
  value: string;
  selected: boolean;
  onSelect: (val: string) => void;
}

const SelectorChip: React.FC<Props> = ({
  value,
  selected,
  onSelect,
}: Props): JSX.Element => {
  return (
    <button
      role="radio"
      aria-checked={selected}
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "rounded border border-white-400 bg-white-100 px-3 py-2 font-sans text-sm font-semibold text-black-800 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        { "border-primary bg-primary text-white": selected }
      )}
    >
      {value}
    </button>
  );
};

export { SelectorChip };
