import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { navLinks, sideBarNavLinks } from "site-data";

import { cn } from "@lib/clsx";

import { Button } from "@components/button";

const sidebarVariants: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
};

const NavBar: React.FC = (): JSX.Element => {
  const router = useRouter();

  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  const toggleSideMenu = useCallback(() => {
    setSideMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] flex h-18 flex-row items-center justify-between bg-white py-3 px-2 shadow-md sm:px-3 md:px-4 md:py-2 lg:h-20 lg:py-3 lg:px-6 xl:px-9 2xl:px-16">
        <Link
          href="/"
          className="grid h-full w-[169px] grid-cols-[max-content] grid-rows-[1fr_min-content] items-start justify-start gap-1 no-underline outline-offset-8 outline-primary-400 focus-visible:outline focus-visible:outline-2 "
        >
          <svg
            viewBox="0 0 157 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.60333 0H34.7993C36.6731 0.00652386 38.4684 0.751901 39.7934 2.07354C41.1184 3.39518 41.8656 5.18583 41.8722 7.0549V25.7855C41.87 27.6559 41.1241 29.449 39.7982 30.7716C38.4722 32.0942 36.6745 32.8382 34.7993 32.8404H2.60333C2.07527 32.8338 1.57118 32.6195 1.20087 32.2439C0.830555 31.8683 0.624016 31.362 0.626238 30.8353V25.4389H33.3765C33.6625 25.4367 33.936 25.3219 34.1374 25.1194C34.3389 24.9169 34.4519 24.6432 34.4519 24.358V8.48239C34.4454 8.20144 34.3296 7.93404 34.1288 7.73688C33.928 7.53971 33.6582 7.42829 33.3765 7.42621H0.626238V2.00508C0.624016 1.47832 0.830555 0.972025 1.20087 0.596469C1.57118 0.220914 2.07527 0.00652544 2.60333 0V0Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.403 0.610663H154.591C154.857 0.608488 155.121 0.658686 155.367 0.758375C155.613 0.858064 155.837 1.00528 156.026 1.19158C156.215 1.37788 156.366 1.59959 156.469 1.84398C156.572 2.08838 156.625 2.35065 156.626 2.61574V5.60273C156.625 5.86782 156.572 6.13009 156.469 6.37449C156.366 6.61888 156.215 6.84059 156.026 7.02689C155.837 7.21319 155.613 7.36041 155.367 7.4601C155.121 7.55978 154.857 7.60998 154.591 7.60781H121.403C120.867 7.60785 120.353 7.39739 119.972 7.02206C119.591 6.64673 119.374 6.13677 119.368 5.60273V2.61574C119.374 2.0817 119.591 1.57174 119.972 1.19641C120.353 0.821079 120.867 0.610624 121.403 0.610663Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.403 13.2022H154.591C154.857 13.2 155.121 13.2502 155.367 13.3499C155.613 13.4496 155.837 13.5968 156.026 13.7831C156.215 13.9694 156.366 14.1911 156.469 14.4355C156.572 14.6799 156.625 14.9422 156.626 15.2073V18.1943C156.625 18.4594 156.572 18.7216 156.469 18.966C156.366 19.2104 156.215 19.4321 156.026 19.6184C155.837 19.8047 155.613 19.952 155.367 20.0516C155.121 20.1513 154.857 20.2015 154.591 20.1994H121.403C120.867 20.1994 120.353 19.9889 119.972 19.6136C119.591 19.2383 119.374 18.7283 119.368 18.1943V15.2155C119.372 14.6801 119.588 14.168 119.969 13.7909C120.351 13.4138 120.866 13.2022 121.403 13.2022Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.403 25.8103H154.591C154.859 25.8092 155.125 25.8612 155.373 25.9634C155.621 26.0655 155.846 26.2157 156.036 26.4053C156.225 26.5949 156.375 26.8201 156.476 27.0678C156.577 27.3155 156.628 27.5808 156.626 27.8484V30.8106C156.624 31.3483 156.409 31.8633 156.028 32.2435C155.647 32.6237 155.13 32.8383 154.591 32.8405H121.403C120.865 32.834 120.351 32.6181 119.971 32.2388C119.59 31.8596 119.374 31.347 119.368 30.8106V27.8484C119.368 27.3093 119.582 26.7921 119.963 26.4102C120.344 26.0282 120.862 25.8125 121.403 25.8103Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M58.4416 29.8202L76.9551 1.56763C77.2776 1.11255 77.7483 0.783044 78.287 0.635232C78.635 0.587225 78.9864 0.567906 79.3376 0.577473H82.3653C82.7247 0.566992 83.0844 0.586311 83.4407 0.635232C83.9776 0.777367 84.4448 1.10857 84.756 1.56763L103.269 29.8202C103.544 30.1904 103.682 30.6434 103.661 31.1032C103.64 31.563 103.461 32.0015 103.154 32.3452C102.922 32.5505 102.647 32.7016 102.35 32.7872C102.052 32.8729 101.739 32.891 101.433 32.8402H97.5616C96.2545 32.8402 96.1635 32.8402 95.204 31.4128L80.868 9.49718L66.4989 31.4128C65.5724 32.865 65.4814 32.8402 64.1744 32.8402H60.3029C59.9895 32.8957 59.6676 32.88 59.3611 32.7943C59.0546 32.7086 58.7714 32.5551 58.5326 32.3452C58.2366 31.9961 58.0647 31.5591 58.0438 31.1024C58.0228 30.6456 58.154 30.1948 58.4168 29.8202H58.4416Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M49.3255 25.5791H53.0812C53.5515 25.5791 54.0026 25.7649 54.3359 26.0958C54.6692 26.4267 54.8576 26.8758 54.8597 27.3449V31.091C54.8576 31.5608 54.6695 32.0108 54.3364 32.343C54.0033 32.6753 53.5522 32.8629 53.0812 32.865H49.3255C48.8596 32.8564 48.4157 32.6657 48.0893 32.3339C47.7628 32.0021 47.58 31.5558 47.5801 31.091V27.3201C47.5865 26.8604 47.7725 26.4212 48.0984 26.0961C48.4244 25.771 48.8646 25.5855 49.3255 25.5791Z"
              fill="#ED1F26"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M108.795 25.5791H112.551C113.021 25.5791 113.472 25.7649 113.806 26.0958C114.139 26.4267 114.327 26.8758 114.33 27.3449V31.091C114.327 31.5608 114.139 32.0108 113.806 32.343C113.473 32.6753 113.022 32.8629 112.551 32.865H108.795C108.327 32.8565 107.881 32.6666 107.55 32.3355C107.22 32.0044 107.032 31.5581 107.025 31.091V27.3201C107.038 26.8581 107.229 26.419 107.559 26.0945C107.889 25.77 108.332 25.5853 108.795 25.5791Z"
              fill="#ED1F26"
            />
          </svg>
          <span className="font-sans text-xs font-bold uppercase leading-snug tracking-wider text-primary">
            Charter
          </span>
        </Link>
        <div className="grid h-full grid-cols-[repeat(2,_max-content)] grid-rows-[1fr] items-center justify-end gap-x-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-9 xl:gap-x-12">
          <div className="hidden flex-row items-center justify-end gap-x-8 sm:flex md:gap-x-9 xl:gap-x-12">
            <div className="hidden flex-row items-center justify-end gap-x-12 xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className={cn(
                    "relative font-sans text-xs font-bold uppercase leading-snug tracking-[0.2em] text-black-800 no-underline outline-offset-2 outline-primary-400 transition-[color] duration-200 ease-in-out hover:text-primary focus-visible:outline focus-visible:outline-2",
                    {
                      "after:absolute after:top-full after:left-0 after:right-0 after:block after:h-[2px] after:w-full after:bg-black-600 after:transition-colors after:duration-200 after:ease-in-out hover:after:bg-primary":
                        router.pathname.startsWith(link.route),
                    }
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Button route="/reservations" type="route" intent="primary">
              Reserve Now
            </Button>
          </div>

          <button
            className="flex aspect-square h-12 w-12 items-center justify-center  p-1 outline-primary-400 focus-visible:outline focus-visible:outline-2 lg:h-14 lg:w-14 lg:p-2"
            onClick={toggleSideMenu}
          >
            <svg
              viewBox="0 0 33 20"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-black-700"
            >
              <rect x="0.215088" y="0.258789" width="32" height="1.5" />
              <rect x="16.2151" y="9.25879" width="16" height="1.5" />
              <rect x="0.215088" y="18.2588" width="32" height="1.5" />
            </svg>
          </button>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {sideMenuOpen && (
          <m.div
            variants={sidebarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[210] grid h-screen w-[min(30rem,100%)] grid-cols-1 grid-rows-[min-content_1fr_min-content] gap-y-6 bg-white p-2 shadow-md will-change-transform",
              "lg:px-4 lg:py-3"
            )}
          >
            <div className="grid h-16 grid-cols-[minmax(min-content,_1fr)_min-content] ">
              <Link
                href="/"
                className="grid h-18 w-[185px] grid-cols-[max-content] grid-rows-[1fr_min-content] items-start justify-start gap-1 p-2 no-underline outline-primary-400 focus-visible:outline focus-visible:outline-2"
              >
                <svg
                  viewBox="0 0 157 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.60333 0H34.7993C36.6731 0.00652386 38.4684 0.751901 39.7934 2.07354C41.1184 3.39518 41.8656 5.18583 41.8722 7.0549V25.7855C41.87 27.6559 41.1241 29.449 39.7982 30.7716C38.4722 32.0942 36.6745 32.8382 34.7993 32.8404H2.60333C2.07527 32.8338 1.57118 32.6195 1.20087 32.2439C0.830555 31.8683 0.624016 31.362 0.626238 30.8353V25.4389H33.3765C33.6625 25.4367 33.936 25.3219 34.1374 25.1194C34.3389 24.9169 34.4519 24.6432 34.4519 24.358V8.48239C34.4454 8.20144 34.3296 7.93404 34.1288 7.73688C33.928 7.53971 33.6582 7.42829 33.3765 7.42621H0.626238V2.00508C0.624016 1.47832 0.830555 0.972025 1.20087 0.596469C1.57118 0.220914 2.07527 0.00652544 2.60333 0V0Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M121.403 0.610663H154.591C154.857 0.608488 155.121 0.658686 155.367 0.758375C155.613 0.858064 155.837 1.00528 156.026 1.19158C156.215 1.37788 156.366 1.59959 156.469 1.84398C156.572 2.08838 156.625 2.35065 156.626 2.61574V5.60273C156.625 5.86782 156.572 6.13009 156.469 6.37449C156.366 6.61888 156.215 6.84059 156.026 7.02689C155.837 7.21319 155.613 7.36041 155.367 7.4601C155.121 7.55978 154.857 7.60998 154.591 7.60781H121.403C120.867 7.60785 120.353 7.39739 119.972 7.02206C119.591 6.64673 119.374 6.13677 119.368 5.60273V2.61574C119.374 2.0817 119.591 1.57174 119.972 1.19641C120.353 0.821079 120.867 0.610624 121.403 0.610663Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M121.403 13.2022H154.591C154.857 13.2 155.121 13.2502 155.367 13.3499C155.613 13.4496 155.837 13.5968 156.026 13.7831C156.215 13.9694 156.366 14.1911 156.469 14.4355C156.572 14.6799 156.625 14.9422 156.626 15.2073V18.1943C156.625 18.4594 156.572 18.7216 156.469 18.966C156.366 19.2104 156.215 19.4321 156.026 19.6184C155.837 19.8047 155.613 19.952 155.367 20.0516C155.121 20.1513 154.857 20.2015 154.591 20.1994H121.403C120.867 20.1994 120.353 19.9889 119.972 19.6136C119.591 19.2383 119.374 18.7283 119.368 18.1943V15.2155C119.372 14.6801 119.588 14.168 119.969 13.7909C120.351 13.4138 120.866 13.2022 121.403 13.2022Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M121.403 25.8103H154.591C154.859 25.8092 155.125 25.8612 155.373 25.9634C155.621 26.0655 155.846 26.2157 156.036 26.4053C156.225 26.5949 156.375 26.8201 156.476 27.0678C156.577 27.3155 156.628 27.5808 156.626 27.8484V30.8106C156.624 31.3483 156.409 31.8633 156.028 32.2435C155.647 32.6237 155.13 32.8383 154.591 32.8405H121.403C120.865 32.834 120.351 32.6181 119.971 32.2388C119.59 31.8596 119.374 31.347 119.368 30.8106V27.8484C119.368 27.3093 119.582 26.7921 119.963 26.4102C120.344 26.0282 120.862 25.8125 121.403 25.8103Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.4416 29.8202L76.9551 1.56763C77.2776 1.11255 77.7483 0.783044 78.287 0.635232C78.635 0.587225 78.9864 0.567906 79.3376 0.577473H82.3653C82.7247 0.566992 83.0844 0.586311 83.4407 0.635232C83.9776 0.777367 84.4448 1.10857 84.756 1.56763L103.269 29.8202C103.544 30.1904 103.682 30.6434 103.661 31.1032C103.64 31.563 103.461 32.0015 103.154 32.3452C102.922 32.5505 102.647 32.7016 102.35 32.7872C102.052 32.8729 101.739 32.891 101.433 32.8402H97.5616C96.2545 32.8402 96.1635 32.8402 95.204 31.4128L80.868 9.49718L66.4989 31.4128C65.5724 32.865 65.4814 32.8402 64.1744 32.8402H60.3029C59.9895 32.8957 59.6676 32.88 59.3611 32.7943C59.0546 32.7086 58.7714 32.5551 58.5326 32.3452C58.2366 31.9961 58.0647 31.5591 58.0438 31.1024C58.0228 30.6456 58.154 30.1948 58.4168 29.8202H58.4416Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M49.3255 25.5791H53.0812C53.5515 25.5791 54.0026 25.7649 54.3359 26.0958C54.6692 26.4267 54.8576 26.8758 54.8597 27.3449V31.091C54.8576 31.5608 54.6695 32.0108 54.3364 32.343C54.0033 32.6753 53.5522 32.8629 53.0812 32.865H49.3255C48.8596 32.8564 48.4157 32.6657 48.0893 32.3339C47.7628 32.0021 47.58 31.5558 47.5801 31.091V27.3201C47.5865 26.8604 47.7725 26.4212 48.0984 26.0961C48.4244 25.771 48.8646 25.5855 49.3255 25.5791Z"
                    fill="#ED1F26"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M108.795 25.5791H112.551C113.021 25.5791 113.472 25.7649 113.806 26.0958C114.139 26.4267 114.327 26.8758 114.33 27.3449V31.091C114.327 31.5608 114.139 32.0108 113.806 32.343C113.473 32.6753 113.022 32.8629 112.551 32.865H108.795C108.327 32.8565 107.881 32.6666 107.55 32.3355C107.22 32.0044 107.032 31.5581 107.025 31.091V27.3201C107.038 26.8581 107.229 26.419 107.559 26.0945C107.889 25.77 108.332 25.5853 108.795 25.5791Z"
                    fill="#ED1F26"
                  />
                </svg>
                <span className="font-sans text-xs font-bold uppercase leading-snug tracking-wider text-primary">
                  Charter
                </span>
              </Link>
              <button
                onClick={toggleSideMenu}
                className="flex h-14 w-14 items-center justify-center border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400 "
              >
                <svg className="aspect-square w-12 fill-black-700 p-2">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-close" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-y-1 overflow-y-auto overflow-x-hidden md:gap-y-2 lg:gap-y-3">
              {sideBarNavLinks.map((link) =>
                link.external ? (
                  <a
                    className="rounded-lg bg-transparent px-6 py-4 text-right text-xl font-bold tracking-wider text-black-800 outline-primary-400 transition-colors duration-200 ease-in-out hover:bg-primary-100 hover:text-primary focus-visible:outline focus-visible:outline-2"
                    key={link.route}
                    href={link.route}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.route}
                    key={link.route}
                    className={cn(
                      "rounded-lg px-3 py-2 text-right text-lg font-bold tracking-wider text-black-800 outline-primary-400 hover:bg-primary-100 hover:text-primary focus-visible:outline focus-visible:outline-2 lg:px-6 lg:py-4 lg:text-xl",
                      "bg-transparent transition-colors duration-200 ease-in-out",
                      { "bg-white-300": router.pathname.startsWith(link.route) }
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div>
              <Button
                route="/reservations"
                type="route"
                intent="primary"
                withArrow
                fullWidth
              >
                Reserve
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { NavBar };
