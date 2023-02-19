import { SecondaryHeading } from "@components/headings/secondary-heading";

interface Props {
  length: number;
  cabins: number;
  crew: number;
  guestsEvents: number | null;
  guestsStay: number | null;
}

const BoatStats: React.FC<Props> = ({
  length,
  cabins,
  crew,
  guestsEvents,
  guestsStay,
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns trim-top grid pt-12">
      <div className="col-content flex flex-row flex-wrap items-start justify-center gap-x-6  gap-y-6">
        <div className="flex aspect-square w-[140px] flex-col items-center justify-center gap-y-3 rounded border border-dashed border-primary-300 p-3 md:w-[160px] md:border-2 lg:w-[180px]">
          <SecondaryHeading alignment="center" intent="secondary">
            {`${length} M`}
          </SecondaryHeading>
          <span className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black-700 md:text-sm">
            Length
          </span>
        </div>
        <div className="flex aspect-square w-[140px] flex-col items-center justify-center gap-y-3 rounded border border-dashed border-primary-300 p-3 md:w-[160px] md:border-2 lg:w-[180px]">
          <SecondaryHeading alignment="center" intent="secondary">
            {String(cabins).padStart(2, "0")}
          </SecondaryHeading>
          <span className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black-700 md:text-sm">
            Cabins
          </span>
        </div>
        <div className="flex aspect-square w-[140px] flex-col items-center justify-center gap-y-3 rounded border border-dashed border-primary-300 p-3 md:w-[160px] md:border-2 lg:w-[180px]">
          <SecondaryHeading alignment="center" intent="secondary">
            {String(crew).padStart(2, "0")}
          </SecondaryHeading>
          <span className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black-700 md:text-sm">
            Crew
          </span>
        </div>
        {guestsEvents && (
          <div className="flex aspect-square w-[140px] flex-col items-center justify-center gap-y-3 rounded border border-dashed border-primary-300 p-3 md:w-[160px] md:border-2 lg:w-[180px]">
            <SecondaryHeading alignment="center" intent="secondary">
              {String(guestsEvents).padStart(2, "0")}
            </SecondaryHeading>
            <span className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black-700 md:text-sm">
              Capacity (Stay)
            </span>
          </div>
        )}
        {guestsStay && (
          <div className="flex aspect-square w-[140px] flex-col items-center justify-center gap-y-3 rounded border border-dashed border-primary-300 p-3 md:w-[160px] md:border-2 lg:w-[180px]">
            <SecondaryHeading alignment="center" intent="secondary">
              {String(guestsStay).padStart(2, "0")}
            </SecondaryHeading>
            <span className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black-700 md:text-sm">
              Capacity (Events)
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export { BoatStats };
