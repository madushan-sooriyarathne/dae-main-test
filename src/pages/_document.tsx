import { Head, Html, Main, NextScript } from "next/document";

import { env } from "@env/client.mjs";

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Marina by D.A.E" />
        <meta name="apple-mobile-web-app-title" content="Marina by D.A.E" />
        <meta name="theme-color" content="#ed1f26" />
        <meta name="msapplication-navbutton-color" content="#ed1f26" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-starturl" content="https://marina.dae.fun/" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/icons/android-icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="57x57"
          href="/assets/icons/apple-icon-57x57.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="60x60"
          href="/assets/icons/apple-icon-60x60.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="72x72"
          href="/assets/icons/apple-icon-72x72.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="76x76"
          href="/assets/icons/apple-icon-76x76.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="114x114"
          href="/assets/icons/apple-icon-114x114.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="120x120"
          href="/assets/icons/apple-icon-120x120.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="144x144"
          href="/assets/icons/apple-icon-144x144.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="152x152"
          href="/assets/icons/apple-icon-152x152.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/assets/icons/apple-icon-180x180.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/icons/favicon-96x96.png"
        />
      </Head>
      <body className="scroll-pt-24">
        {/* GTM No script fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
