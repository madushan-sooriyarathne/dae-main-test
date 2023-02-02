import { type ReactNode } from "react";

import Head from "next/head";

import { Footer } from "./footer";
import { NavBar } from "./nav-bar";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

const Page: React.FC<Props> = ({ title, children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{`${title} - DAE Starter`}</title>
      </Head>
      <NavBar />
      <main className="m-auto flex min-h-screen w-[min(100%,_208rem)] flex-col items-stretch justify-end gap-y-20 2xl:gap-y-24 4xl:gap-y-36">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Page;
