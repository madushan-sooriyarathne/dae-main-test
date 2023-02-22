import { ImageComponent } from "@components/image-component";

interface Props {
  image: Image;
}

const ArticleHeader: React.FC<Props> = ({ image }: Props): JSX.Element => {
  return (
    <header className="h-[70vh] w-full supports-[height:1svh]:h-[60svh]">
      <ImageComponent image={image} />
    </header>
  );
};

export { ArticleHeader };
