import { Paragraph } from "@components/paragraph";

interface Props {
  content: string;
}
const LegalPageContent: React.FC<Props> = ({ content }: Props): JSX.Element => {
  return (
    <div className="mx-auto mb-20 w-[min(70rem,100%)] 2xl:mb-24 4xl:mb-36">
      <Paragraph alignment="left">{content}</Paragraph>
    </div>
  );
};

export { LegalPageContent };
