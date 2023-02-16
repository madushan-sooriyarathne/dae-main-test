import { cn } from "@lib/clsx";

import { type BannerCardType, BannerCard } from "@components/banner-card";

interface Props {
  options: BannerCardType[];
}

const BoatOptions: React.FC<Props> = ({ options }: Props): JSX.Element => {
  return (
    <section
      className={cn(
        "grid auto-rows-min grid-cols-1 gap-y-6 px-4 mlg:grid-cols-2 mlg:gap-x-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-18 4xl:!px-32"
      )}
    >
      {options.map((option, index) => (
        <BannerCard {...option} key={index} />
      ))}
    </section>
  );
};

export default BoatOptions;
