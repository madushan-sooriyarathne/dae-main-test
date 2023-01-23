import Image from "next/image";

interface Props {
  image: Image;
  objectFit?: "cover" | "contain";
  pos?: {
    x: string;
    y: string;
  };
  width?: string;
  height?: string;
  sizes?: string;
  priority?: boolean;
}

const ImageComponent: React.FC<Props> = ({
  image,
  pos = { x: "center", y: "center" },
  width = "100%",
  height = "100%",
  objectFit = "cover",
  priority = false,
  sizes,
}: Props): JSX.Element => {
  return (
    <div className={`relative`} style={{ width: width, height: height }}>
      <Image
        src={image.src}
        alt={image.alt}
        style={{ objectFit: objectFit, objectPosition: `${pos.x} ${pos.y}` }}
        sizes={sizes}
        fill
        placeholder="blur"
        blurDataURL={
          image.blurUrl.length < 1
            ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQImQE0AMv/AOfp6JSVlPD//8jW1AD3+PaioZuulYNiaV8AclZKRSYWSiIHGQAAAHBybysnJIqXmr+9tA8pGVrndwlFAAAAAElFTkSuQmCC"
            : image.blurUrl
        }
        priority={priority}
      />
    </div>
  );
};

export { ImageComponent };
