import Link from "next/link";

import { TitleContentSection } from "@layout/common/title-content-section";

import { TertiaryHeading } from "@components/headings/tertiary-heading";

interface Props {
  otherOpenings: JobPost[];
}

const OtherOpeningsSection: React.FC<Props> = ({
  otherOpenings,
}: Props): JSX.Element => {
  return (
    <TitleContentSection heading="Other Available Openings">
      <div>
        <div className="grid w-full grid-cols-1 gap-3 mlg:grid-cols-2 lg:gap-4 xl:gap-x-6">
          {otherOpenings.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.id}`}
              className="flex w-full max-w-[31.25rem] flex-col items-start justify-between gap-y-5 rounded border  border-white-400 bg-white-100 p-4 outline-none transition-colors duration-200 ease-in-out hover:border-white-800 hover:bg-white-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-800 mlg:max-w-full lg:gap-y-8"
            >
              <div>
                <span className="text-left font-sans text-xs font-medium uppercase tracking-wider text-black-600 lg:text-sm lg:font-semibold ">
                  {job.department}
                </span>
                <TertiaryHeading alignment="left" intent="secondary">
                  {job.title}
                </TertiaryHeading>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-3 lg:gap-7">
                <span className="flex items-center justify-start gap-x-1 fill-black-700 text-left font-sans text-xs font-semibold tracking-wide text-black-700 lg:gap-x-2 lg:text-sm">
                  <svg className="h-5 w-4">
                    <use xlinkHref="/assets/svg/sprites.svg#icon-location-pin" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center justify-start gap-x-1 fill-black-700 text-left font-sans text-xs font-semibold tracking-wide text-black-700 lg:gap-x-2 lg:text-sm">
                  <svg className="h-5 w-4">
                    <use xlinkHref="/assets/svg/sprites.svg#icon-clock" />
                  </svg>
                  {job.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </TitleContentSection>
  );
};

export { OtherOpeningsSection };
