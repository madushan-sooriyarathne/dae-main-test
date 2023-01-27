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
    <main className="m-auto flex min-h-screen w-[min(100%,_208rem)] flex-col items-stretch justify-start gap-y-20 2xl:gap-y-24 4xl:gap-y-36">
      <Head>
        <title>{`${title} - DAE Starter`}</title>
      </Head>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Page;
