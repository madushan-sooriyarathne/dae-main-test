import { Accordion } from "@components/accordion";
import { PrimaryHeading } from "@components/headings/primary-heading";

interface Props {
  faqs: FAQ[];
}

const FAQSection: React.FC<Props> = ({ faqs }: Props): JSX.Element => {
  return (
    <section className="main-grid-columns w-full auto-rows-min items-center justify-items-start gap-y-9 mlg:justify-items-center">
      <div className="col-content flex justify-start mlg:[&>h2]:text-center">
        <PrimaryHeading intent="primary" alignment="left">
          Frequently Asked Questions
        </PrimaryHeading>
      </div>
      <div className="col-content w-full">
        <Accordion
          items={faqs.map((faq) => ({
            id: faq.id,
            trigger: faq.question,
            content: faq.answer,
          }))}
        />
      </div>
    </section>
  );
};

export { FAQSection };
