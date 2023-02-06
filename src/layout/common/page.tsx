import { type ReactNode } from "react";

import Head from "next/head";
import { m } from "framer-motion";

import { Footer } from "./footer";
import { NavBar } from "./nav-bar";
import { Floater } from "@components/floater";
// import { Toast } from "@components/toast";
import { pageTransition } from "@styles/animations";

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
    >
      <Head>
        <title>{`${title} - DAE Starter`}</title>
      </Head>
      <NavBar />
      <main className="m-auto flex min-h-screen w-[min(100%,_208rem)] flex-col items-stretch justify-end gap-y-20 2xl:gap-y-24 4xl:gap-y-36">
        {children}
      </main>
      <Footer />
      <Floater />
      {/* <Toast /> */}
    </m.div>
  );
};

export default Page;
