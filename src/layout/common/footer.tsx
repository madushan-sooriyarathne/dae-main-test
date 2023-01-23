import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { Paragraph } from "@components/paragraph";
import Link from "next/link";
import { brand, navLinks, socialLinks } from "site-data";
import { twMerge } from "tailwind-merge";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="main-grid-columns grid w-full auto-rows-min grid-cols-1 items-start justify-items-center gap-y-12 bg-water bg-darkWater pt-12 md:gap-y-0 md:pt-0">
      <div
        className={twMerge(
          "col-[full-start_/_full-end] flex h-full  w-full place-content-center border-b border-b-water-800 pb-12",
          "md:col-[full-start_/_col-end_4] md:grid md:border-r md:border-r-water-800 md:py-12",
          "xl:col-[full-start_/_col-end_2]",
          "2xl:row-start-1 2xl:row-end-3"
        )}
      >
        <object
          data="/assets/logos/dae-logo-full-white.svg"
          type="image/svg+xml"
          className="2xl:w-[min(100%, 20rem)] w-[min(100%,_15.625rem)]"
        />
      </div>
      <div
        className={twMerge(
          "col-[full-start_/full-end] flex h-full w-full flex-col items-center justify-start gap-y-6 border-b border-b-water-800 pb-12",
          "md:col-[col-start_5_/_full-end] md:items-start md:gap-y-5 md:py-12 md:px-8",
          "lg:px-12",
          "xl:col-[col-start_3_/_col-end_6] xl:border-r xl:border-r-water-800",
          "2xl:col-[col-start_3_/_col-end_5]"
        )}
      >
        <div className="flex flex-col items-center justify-start gap-y-1 md:items-start md:[&_h5]:text-left md:[&_p]:text-left">
          <QuaternaryHeading alignment="center" intent="white">
            {brand.companyName}
          </QuaternaryHeading>
          <Paragraph alignment="center" intent="white" small>
            {brand.address}
          </Paragraph>
        </div>
        <div className="-mt-4 flex items-center gap-x-6">
          {brand.vatNo && (
            <span className="text-center text-3xs font-bold uppercase tracking-wider text-black-500 xl:text-2xs">{`VAT NO: ${brand.vatNo}`}</span>
          )}
          {brand.registrationNumber && (
            <span className="text-center text-3xs font-bold uppercase tracking-wider text-black-500 xl:text-2xs">{`Registration NO: ${brand.registrationNumber}`}</span>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-8">
          <div className="flex items-center justify-start gap-x-2">
            <svg className="h-5 w-5 fill-white">
              <use xlinkHref="/assets/svg/sprites.svg#icon-phone" />
            </svg>
            <a
              href={`tel:${brand.phone}`}
              className="text-left font-sans text-xs font-semibold tracking-wide text-white no-underline xl:text-sm"
            >
              {brand.phone}
            </a>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <svg className="h-5 w-5 fill-white">
              <use xlinkHref="/assets/svg/sprites.svg#icon-email" />
            </svg>
            <a
              href={`mailto:${brand.email}`}
              className="text-left font-sans text-xs font-semibold tracking-wide text-white no-underline xl:text-sm"
            >
              {brand.email}
            </a>
          </div>
        </div>
        <div className="mt-4 -mb-8 flex items-center justify-center gap-x-4 md:mb-0">
          <Link
            href="/privacy-policy"
            className="text-2xs font-semibold tracking-wide text-black-500 underline xl:text-xs"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-2xs font-semibold tracking-wide text-black-500 underline xl:text-xs"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/terms-of-use"
            className="text-2xs font-semibold tracking-wide text-black-500 underline xl:text-xs"
          >
            Terms of use
          </Link>
        </div>
      </div>
      <div
        className={twMerge(
          "col-[content-start_/_content-end] flex h-full w-full flex-col items-center justify-start gap-y-4 border-b border-b-water-800 pb-12",
          "md:col-[full-start_/_full-end] md:flex-row md:justify-center md:gap-x-6 md:border-b-0 md:py-12 md:px-9",
          "xl:col-[col-start_7_/_full-end] xl:flex-col xl:items-start xl:justify-start xl:border-b xl:p-12",
          "2xl:col-[col-start_6_/_col-end_7] 2xl:border-r 2xl:border-r-water-800"
        )}
      >
        {navLinks.map((link) => (
          <Link
            href={link.route}
            key={link.route}
            className="text-xs font-bold uppercase tracking-widest text-white no-underline xl:text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div
        className={twMerge(
          "col-[full-start_/_full-end] flex h-full w-full flex-row flex-wrap items-center justify-center gap-y-3 gap-x-3 border-b border-b-water-800 pb-12",
          "md:border-b-0 md:px-9",
          "xl:py-6",
          "2xl:col-[col-start_8_/_full-end]  2xl:grid 2xl:grid-cols-[repeat(2,_min-content)] 2xl:items-start 2xl:justify-start 2xl:border-b 2xl:p-12"
        )}
      >
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="group/link cursor-pointer border border-white p-3 transition-[background-color] duration-200 ease-in-out hover:bg-white"
          >
            <svg className="h-5 w-5 fill-white transition-[fill] duration-200 ease-in-out group-hover/link:fill-water">
              <use xlinkHref={`/assets/svg/sprites.svg#icon-${link.id}`} />
            </svg>
          </a>
        ))}
      </div>
      <div
        className={twMerge(
          "col-[full-start_/_full-end] -mt-8 flex w-full flex-col items-center justify-start gap-y-3 px-4 pb-4",
          "md:border-t md:border-t-water-800 md:pt-6",
          "xl:mt-0 xl:flex-row xl:justify-between xl:gap-x-12 xl:px-12",
          "2xl:col-[col-start_3_/_full-end]  2xl:border-t-0"
        )}
      >
        <span className="text-center text-2xs font-semibold uppercase tracking-wide text-white xl:text-xs xl:tracking-wider">{`© ${new Date().getFullYear()}  Debug Auto Exclusive. All rights reserved.`}</span>
        <span className="flex items-center gap-x-1 text-center text-2xs font-semibold uppercase leading-tight tracking-wide text-white xl:text-xs xl:tracking-wider">
          Web concept by{" "}
          <a href="https://advertaro.lk" target="_blank" rel="noreferrer">
            <object
              data="/assets/svg/advertaro-logo.svg"
              className="mb-1 h-[13px] w-[70px] object-contain  xl:h-[14px] xl:w-[90px]"
            />
          </a>
        </span>
      </div>
    </footer>
  );
};

export { Footer };
