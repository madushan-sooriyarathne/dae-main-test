import { errorTypes } from "site-data";

import { Button } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  errorCode: number;
}

const ErrorView: React.FC<Props> = ({ errorCode }: Props): JSX.Element => {
  const errorData = errorTypes.find((err) => err.code === errorCode);

  if (!errorData) return <></>;

  return (
    <section className="main-grid-columns mt-32 mb-20 grid  auto-rows-min items-center gap-y-9">
      <div className="col-content flex h-[500px] w-full max-w-[600px] flex-col items-start justify-center gap-y-7 mlg:col-content-start-half mlg:h-auto mlg:max-w-full mlg:pr-9 xl:pr-12 2xl:!pr-16">
        <div className="space-y-1">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-black-600">{`Error ${errorCode}`}</span>
          <PrimaryHeading alignment="left" intent="primary">
            {errorData.title}
          </PrimaryHeading>
        </div>
        <Paragraph alignment="left" intent="black">
          {errorData.message}
        </Paragraph>
        <Button type="route" route="/" withArrow intent="primary">
          Take me to Home page
        </Button>
      </div>
      <div className="col-content-end-half hidden aspect-square w-full overflow-hidden rounded-lg mlg:block">
        <ImageComponent image={errorData.image} sizes="50vw" />
      </div>
    </section>
  );
};

export default ErrorView;
