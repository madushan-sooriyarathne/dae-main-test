import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, m } from "framer-motion";

import { formatId } from "@utils/base";

import { ResizablePanel } from "@layout/common/resizable-panel";
import { TitleContentSection } from "@layout/common/title-content-section";

import { TertiaryHeading } from "@components/headings/tertiary-heading";
import { LoadingSpinner } from "@components/loading-spinner";
import { SelectorChip } from "@components/selector-chip";

import { fadeIn } from "@styles/animations";

interface Props {
  openings: JobPost[];
}

const LatestOpenings: React.FC<Props> = ({ openings }: Props): JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const departments = useMemo(() => {
    const deps: string[] = ["All"];

    openings.forEach((job) => {
      if (!deps.includes(job.department)) {
        deps.push(job.department);
      }
    });

    return deps;
  }, [openings]);

  const [selectedDep, setSelectedDep] = useState<string>(
    departments[0] as string
  );
  const filteredJobs = useMemo(() => {
    return openings.filter(
      (job) => job.department === selectedDep || selectedDep === "All"
    );
  }, [selectedDep, openings]);

  const handleDepSelect = useCallback((val: string) => {
    setLoading(true);
    setSelectedDep(val);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (router.query.dep) {
      if (router.query.dep instanceof Array) {
        setSelectedDep(router.query.dep[0] as string);
      } else {
        setSelectedDep(router.query.dep);
      }
    }
  }, [router.query.dep]);

  return (
    <TitleContentSection
      heading="Latest Openings"
      alignment="left"
      intent="primary"
    >
      <div
        className="grid w-full grid-cols-1 items-start justify-items-start gap-y-5"
        id="latest-openings"
      >
        <div
          className="flex flex-wrap items-start justify-start gap-3"
          role="radiogroup"
        >
          {departments.map((dep) => (
            <SelectorChip
              value={dep}
              key={formatId(dep)}
              selected={selectedDep === dep}
              onSelect={handleDepSelect}
            />
          ))}
        </div>
        <ResizablePanel>
          {loading ? (
            <m.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              key="loading-spinner"
            >
              <LoadingSpinner message="Loading results" />
            </m.div>
          ) : (
            <m.div
              className="grid w-full grid-cols-1 gap-3 mlg:grid-cols-2 lg:gap-4 xl:gap-x-6"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              key="job-results"
            >
              {filteredJobs.map((job) => (
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
            </m.div>
          )}
        </ResizablePanel>
      </div>
    </TitleContentSection>
  );
};

export { LatestOpenings };
