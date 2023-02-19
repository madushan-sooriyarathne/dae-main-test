import useMediaQuery from "@hooks/useMediaQuery";

import { HeadingGroup } from "@layout/common/groups/heading-group";

import { Carousel } from "@components/carousel";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { Paragraph } from "@components/paragraph";

interface Props {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<Props> = ({
  testimonials,
}: Props): JSX.Element => {
  const enableNavigation = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="main-grid-columns grid gap-y-9 bg-water  py-16 lg:bg-transparent ">
      <div className="col-content flex w-full items-center justify-center lg:col-full-start-half lg:aspect-[4/3] lg:rounded-br-[5rem] lg:bg-water lg:p-12 xl:!col-[full-start_/_col-end_3] xl:p-16 2xl:p-18 3xl:px-24">
        <HeadingGroup
          heading="What Our Guests Are Saying"
          subHeading="Customer Testimonials"
          intent="white"
          alignment="center"
        />
      </div>
      <div className="col-content w-full lg:col-full-end-half lg:row-start-1 lg:flex lg:h-full lg:items-center lg:p-9 xl:col-[col-start_4_/_full-end] xl:px-16 2xl:px-24 3xl:px-32 4xl:px-40">
        <Carousel
          withDots
          withNavigation={enableNavigation}
          breakpoints={{
            "(min-width: 320px)": {
              slides: {
                perView: 1,
                spacing: 16,
              },
            },
            "(min-width: 480px)": {
              slides: {
                perView: 1.2,
                spacing: 16,
              },
            },
            "(min-width: 600px)": {
              slides: {
                perView: 1.5,
                spacing: 16,
              },
            },
            "(min-width: 750px)": {
              slides: {
                perView: 1.8,
                spacing: 16,
              },
            },
            "(min-width: 1024px)": {
              slides: {
                perView: 1,
                spacing: 24,
              },
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex h-full w-full max-w-[31.25rem] flex-col items-center gap-y-6 rounded-sm bg-white p-4 shadow-md @container lg:shadow-none"
            >
              <QuaternaryHeading
                alignment="center"
                intent="black"
                className="@md:text-center"
              >
                {testimonial.title}
              </QuaternaryHeading>
              <Paragraph alignment="center" className="@md:[&_p]:text-center">
                {testimonial.content}
              </Paragraph>
              <div className="flex flex-col items-center @md:items-center">
                <svg
                  viewBox="0 0 456 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden h-2 w-full fill-primary-200 @md:block"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M455.904 1.90723H235.461L228.71 8.65797L228.004 9.36531L227.296 8.6582L220.549 1.91113H0.0964355V0.911133H220.956V0.914764L220.961 0.908936L228.003 7.95087L235.044 0.90979V0.907227H455.904V1.90723Z"
                  />
                </svg>
                <Paragraph
                  alignment="center"
                  className="@md:[&_p]:text-center"
                >{`__${testimonial.customerName}__`}</Paragraph>
                {testimonial.customerNote && (
                  <span className="text-center text-xs tracking-wide text-black-700 @md:text-center">
                    {testimonial.customerNote}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export { TestimonialSection };
