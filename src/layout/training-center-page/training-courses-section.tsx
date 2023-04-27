import { cn } from "@lib/clsx";

import { TitleContentSection } from "@layout/common/title-content-section";

import { Button } from "@components/button";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  courses: TrainingCourse[];
}

const TrainingCoursesSection: React.FC<Props> = ({
  courses,
}: Props): JSX.Element => {
  return (
    <TitleContentSection heading="Our Courses" alignment="center">
      <div className="flex flex-col items-stretch justify-start gap-y-14">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="grid auto-rows-min grid-cols-1 items-start justify-items-start overflow-hidden rounded border border-white-300 lg:grid-cols-2 lg:border-none"
          >
            <div
              className={cn(
                "aspect-[4/3] w-full  md:aspect-video lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 lg:aspect-auto lg:h-full",
                {
                  "lg:col-start-2 lg:col-end-3": index % 2 === 0,
                }
              )}
            >
              <ImageComponent image={course.image} />
            </div>
            <div
              className={cn(
                "flex w-full flex-col items-stretch justify-start gap-y-5 bg-lightWater p-3 md:p-5 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:gap-y-8 lg:py-10 lg:px-8 xl:p-12",
                {
                  "lg:col-start-1 lg:col-end-2": index % 2 === 0,
                }
              )}
            >
              <div className="flex flex-col items-start justify-start gap-y-1">
                <SecondaryHeading alignment="left" intent="secondary">
                  {course.name}
                </SecondaryHeading>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <span className="rounded bg-water-200 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-water lg:text-sm lg:font-bold">{`Duration: ${course.duration}`}</span>
                  <span className="rounded bg-water-200 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-water lg:text-sm lg:font-bold">{`Minimum Age: ${course.minAge} Years`}</span>
                </div>
              </div>
              <Paragraph alignment="left">{course.description}</Paragraph>
              <div className="flex flex-col flex-wrap items-stretch justify-start gap-2 md:flex-row md:items-start ">
                <Button
                  type="route"
                  route={`/inquiries?type=training-course&course=${course.id}`}
                  intent="primary"
                  withArrow
                  solid
                >
                  Apply Now
                </Button>
                {course.courseOutline && (
                  <Button
                    type="link"
                    link={course.courseOutline}
                    external
                    intent="primary"
                    outline
                    withArrow
                  >
                    Course Outline
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </TitleContentSection>
  );
};

export { TrainingCoursesSection };
