import { Button, type ButtonType } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";

interface Props {
  heading: string;
  subHeading?: string;
  button?: ButtonType;
}

const CTASection: React.FC<Props> = ({
  button,
  subHeading,
  heading,
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid">
      <div className="col-content grid w-full grid-cols-1 items-start justify-items-start gap-y-8 rounded-2xl bg-water px-4 py-9 sm:px-6 md:px-8 md:py-12 mlg:grid-cols-[1fr_max-content] mlg:items-center mlg:gap-x-8 lg:py-16 xl:gap-x-16 ">
        <div className="flex flex-col items-start justify-center">
          {subHeading && (
            <QuaternaryHeading alignment="left" intent="white">
              {subHeading}
            </QuaternaryHeading>
          )}
          <PrimaryHeading alignment="left" intent="white">
            {heading}
          </PrimaryHeading>
        </div>
        <div className="w-max">
          {button && <Button {...button} withArrow solid intent="primary" />}
        </div>
      </div>
    </section>
  );
};

export { CTASection };
