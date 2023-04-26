import { type ReactNode } from "react";
import Head from "next/head";
import { m } from "framer-motion";

import { Footer } from "@layout/common/footer";
import { NavBar } from "@layout/common/nav-bar";

import { Floater } from "@components/floater";
import { Toast } from "@components/toast";
import WhatsappWidget from "@components/whatsapp-widget";

import { pageTransition } from "@styles/animations";

import { CookieConsent } from "./cookie-consent";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

const Page: React.FC<Props> = ({ title, children }: Props): JSX.Element => {
  return (
    <m.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      key={title.replace(" ", "-")}
      className="grid min-h-screen grid-cols-1 grid-rows-[1fr_min-content] items-start justify-items-stretch "
    >
      <Head>
        <title>{`${title} | Debug Auto Exclusive`}</title>
      </Head>
      <NavBar />
      <main className="row-start-1 mx-auto  flex w-[min(100%,_208rem)] flex-col items-stretch justify-start gap-y-20 self-start 2xl:gap-y-24 4xl:gap-y-36">
        {children}
      </main>
      <Footer />
      <Floater />
      <CookieConsent />
      <WhatsappWidget />
      <Toast />
    </m.div>
  );
};

export default Page;
