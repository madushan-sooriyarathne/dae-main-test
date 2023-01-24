import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";

import { PrimaryHeading } from "./headings/primary-heading";
import { SecondaryHeading } from "./headings/secondary-heading";
import { TertiaryHeading } from "./headings/tertiary-heading";
import { QuaternaryHeading } from "./headings/quaternary-heading";
import { QuinaryHeading } from "./headings/quinary-heading";

const paragraphVariants = cva(
  [
    "w-full flex flex-col items-stretch justify-start",
    "[&>*:not(:first-child)]:mt-[0.625rem] md:[&>*:not(:first-child)]:mt-4 lg:[&>*:not(:first-child)]:mt-5",
  ],
  {
    variants: {
      intent: {
        primary: "text-primary",
        secondary: "text-water",
        tertiary: "text-land",
        white: "text-white",
        black: "text-black",
      },
      alignment: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      small: {
        true: "[&_p]:text-[0.8125rem] md:[&_p]:text-sm",
      },
      titleParagraph: {
        true: "[&_p]:font-medium [&_p]:leading-snug md:[&_p]:text-lg",
      },
    },
  }
);

const paragraph = (props: VariantProps<typeof paragraphVariants>) =>
  twMerge(paragraphVariants(props));

interface Props extends VariantProps<typeof paragraphVariants> {
  children: string;
}

const Paragraph: React.FC<Props> = ({
  children,
  alignment,
  intent,
  small,
  titleParagraph,
}: Props): JSX.Element => {
  return (
    <div className={paragraph({ alignment, intent, small, titleParagraph })}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer break-words font-semibold text-primary underline underline-offset-2 transition-[color] duration-200 ease-in-out [hyphens:auto]"
            >
              {props.children}
            </a>
          ),
          h1: (props) => (
            <PrimaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-8 first:mt-0 md:mt-10 md:first:mt-0 lg:mt-12 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </PrimaryHeading>
          ),
          h2: (props) => (
            <SecondaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-6 first:mt-0 md:mt-9 md:first:mt-0 lg:mt-11 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </SecondaryHeading>
          ),
          h3: (props) => (
            <TertiaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-5 first:mt-0 md:mt-8 md:first:mt-0 lg:mt-10 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </TertiaryHeading>
          ),
          h4: (props) => (
            <QuaternaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-4 first:mt-0 md:mt-5 md:first:mt-0 lg:mt-6 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </QuaternaryHeading>
          ),
          h5: (props) => (
            <QuinaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-4 first:mt-0 md:mt-5 md:first:mt-0 lg:mt-6 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </QuinaryHeading>
          ),
          h6: (props) => (
            <QuinaryHeading
              intent={intent}
              alignment={alignment}
              className={twMerge(
                "mt-4 first:mt-0 md:mt-5 md:first:mt-0 lg:mt-6 lg:first:mt-0"
              )}
            >
              {props.children as string}
            </QuinaryHeading>
          ),
          p: (props) => (
            <p
              {...props}
              className="font-sans text-base font-normal leading-normal tracking-wide"
            >
              {props.children}
            </p>
          ),
          img: (props) => (
            <div className="my-6 w-full">
              <Image
                width={`${props.width as number}`}
                height={`${props.height as number}`}
                src={props.src as string}
                alt={props.alt as string}
              />
            </div>
          ),
          ol: (props) => (
            <ol
              {...props}
              className="flex flex-col items-start justify-start gap-x-3 pl-6 [&>li]:leading-snug"
            >
              {props.children}
            </ol>
          ),
          ul: (props) => (
            <ul
              {...props}
              className="flex flex-col items-start justify-start gap-x-3 pl-6 [&>li]:leading-snug"
            >
              {props.children}
            </ul>
          ),
          strong: (props) => (
            <strong {...props} className="font-medium">
              {props.children}
            </strong>
          ),
          b: (props) => (
            <b {...props} className="font-medium">
              {props.children}
            </b>
          ),
          em: (props) => (
            <em {...props} className="italic">
              {props.children}
            </em>
          ),
          i: (props) => (
            <i {...props} className="italic">
              {props.children}
            </i>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export { Paragraph };
