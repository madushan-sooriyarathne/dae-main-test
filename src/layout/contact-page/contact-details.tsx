import { brand } from "site-data";

import { PrimaryHeading } from "@components/headings/primary-heading";

const ContactDetailsSection: React.FC = (): JSX.Element => {
  return (
    <section className="main-grid-columns grid items-start justify-items-center">
      <div className="col-content flex flex-col items-center justify-start gap-y-4">
        <div className="flex flex-col items-center gap-y-2">
          <PrimaryHeading alignment="center" intent="primary">
            {brand.companyName}
          </PrimaryHeading>
        </div>
        <address className="text-center text-base font-bold not-italic tracking-wide text-black">
          {brand.address}
        </address>
        <div className="group/contact relative flex w-full flex-col items-center rounded-md border border-black-200/50 p-6 transition-[background-color] duration-200 ease-in-out hover:bg-black-100/40">
          <div className="flex flex-col items-start gap-y-4 gap-x-8 mlg:flex-row ">
            <a
              href={`tel:${brand.phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-x-2"
            >
              <div className="w-100% aspect-square rounded-full border border-dashed border-primary p-2">
                <svg className="h-4 w-4 fill-primary">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-phone" />
                </svg>
              </div>
              <span className="font-sans text-lg font-bold tracking-wide  text-black-800">
                {brand.phone}
              </span>
            </a>
            <a
              href={brand.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-x-2"
            >
              <div className="w-100% aspect-square rounded-full border border-dashed border-primary p-2">
                <svg className="h-4 w-4 fill-primary">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-whatsapp" />
                </svg>
              </div>
              <span className="font-sans text-lg font-bold tracking-wide  text-black-800">
                {brand.whatsapp.number}
              </span>
            </a>
            <a
              href={`mailto:${brand.email}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-x-2"
            >
              <div className="w-100% aspect-square rounded-full border border-dashed border-primary p-2">
                <svg className="h-4 w-4 fill-primary">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-email" />
                </svg>
              </div>
              <span className="font-sans text-lg font-bold tracking-wide  text-black-800">
                {brand.email}
              </span>
            </a>
          </div>
          <object
            data="/assets/svg/gradient-shadow.svg"
            className="absolute top-full left-0 right-0 w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover/contact:opacity-100"
          />
        </div>
      </div>
    </section>
  );
};

export { ContactDetailsSection };
