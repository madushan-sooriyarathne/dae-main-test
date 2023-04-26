import { formatDate } from "@utils/base";

import { DisplayHeading } from "@components/headings/display-heading";

interface Props {
  title: string;
  date: string;
}

const LegalPageHeader: React.FC<Props> = ({
  title,
  date,
}: Props): JSX.Element => {
  return (
    <header className="grid h-[50vh] grid-cols-1 grid-rows-[minmax(min-content,1fr)_min-content] items-center justify-center bg-lightWater  pt-18 supports-[height:1svh]:h-[50svh]">
      <DisplayHeading alignment="center">{title}</DisplayHeading>
      <div className="flex w-full items-center justify-center bg-water px-10 py-8">
        <time className="font-sans text-lg font-bold tracking-wider text-white-100">{`Effective from ${formatDate(
          date
        )}`}</time>
      </div>
    </header>
  );
};

export { LegalPageHeader };
