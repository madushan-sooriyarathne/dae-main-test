import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@lib/clsx";

import { Paragraph } from "@components/paragraph";

interface Props {
  items: {
    trigger: string;
    content: string;
    id: string;
  }[];
  single?: true;
}

const Accordion: React.FC<Props> = ({ items, single }: Props): JSX.Element => {
  return (
    <div className="mx-auto w-[min(56.25rem,100%)]">
      <AccordionPrimitive.Root
        type={single ? "single" : "multiple"}
        className="overflow-hidden rounded-sm border border-black-200 [&>*:first-child>button]:border-t-0 [&>*:last-child>button[data-state=closed]]:border-b-0"
        collapsible
      >
        {items.map((item) => (
          <AccordionPrimitive.Item
            key={item.id}
            value={item.id}
            className={`w-full`}
          >
            <AccordionPrimitive.Trigger
              className={cn(
                `flex w-full items-center justify-between gap-x-4 border-b border-t border-t-black-200 border-b-black-200 bg-white-100 py-3 px-2 transition-all`,
                "md:py-4 md:px-4  [&[data-state=open]>svg]:rotate-180 [&[data-state=closed]]:border-b-0"
              )}
            >
              <span className="text-left text-lg font-medium tracking-wide md:text-xl md:font-semibold xl:text-2xl">
                {item.trigger}
              </span>
              <svg className="h-4 w-4 transition-transform duration-200">
                <use xlinkHref="/assets/svg/sprites.svg#icon-chevron-down" />
              </svg>
            </AccordionPrimitive.Trigger>
            <AccordionPrimitive.Content className="overflow-hidden  text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="px-2 py-3 md:py-4 md:px-4">
                <Paragraph>{item.content}</Paragraph>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
};

export { Accordion };
