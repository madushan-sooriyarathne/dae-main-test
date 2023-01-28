import { Button, type ButtonType } from "@components/button";
import { HeadingGroup, type HeadingGroupType } from "./groups/heading-group";

interface Props extends HeadingGroupType {
  button?: ButtonType;
}

const CTASection: React.FC<Props> = ({
  button,
  ...headingGroupProps
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid bg-water  py-12 md:py-14 lg:py-16 xl:py-24">
      <div className="col-content flex flex-col items-center justify-start gap-y-6">
        <HeadingGroup
          {...headingGroupProps}
          intent="white"
          alignment="center"
        />
        {button && <Button {...button} withArrow intent="white" />}
      </div>
    </section>
  );
};

export { CTASection };
