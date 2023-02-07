import { formatDate } from "@utils/base";
import { Button } from "./button";
import { QuaternaryHeading } from "./headings/quaternary-heading";
import { ImageComponent } from "./image-component";
import { Paragraph } from "./paragraph";

interface Props {
  article: ArticlePreview;
}

const ArticleCard: React.FC<Props> = ({ article }: Props): JSX.Element => {
  return (
    <figure className="w-full overflow-hidden rounded-sm @container">
      <div className="aspect-video w-full @[23.75rem]:aspect-[4/3]">
        <ImageComponent image={article.image} />
      </div>
      <div className="flex w-full flex-col items-stretch justify-start gap-y-4 bg-white-200 px-2 py-3 md:p-4">
        <div>
          <time className="text-xs font-semibold uppercase tracking-widest text-black-700">
            {formatDate(article.date)}
          </time>
          <QuaternaryHeading alignment="left" intent="primary">
            {article.title}
          </QuaternaryHeading>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-y-4">
          <div className="hidden @xs:block">
            <Paragraph alignment="left" intent="black">
              {article.previewText}
            </Paragraph>
          </div>
          <Button
            type="link"
            link={article.url}
            intent="primary"
            external
            fullWidth
            small
          >
            Read More
          </Button>
        </div>
      </div>
    </figure>
  );
};

export { ArticleCard };
