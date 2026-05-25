import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" />
        <meta property="og:type" content="book" />
        <meta property="og:site_name" content="The Singleton" />
        <meta property="og:title" content="The Singleton — Life of an SDE" />
        <meta property="og:description" content="A techno-existential thriller. 2030, Irvine. A senior SDE starts feeling things that aren't his. His instruments say the signal is real; his company says he's having a breakdown. Ninety days, fifty million strangers, one decision that can't be taken back." />
        <meta property="og:image" content="/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Singleton — Life of an SDE" />
        <meta name="twitter:description" content="A techno-existential thriller for the 2030 SDE. Bilingual EN / 中文." />
        <meta name="twitter:image" content="/og-cover.jpg" />
        <meta name="theme-color" content="#0c0c0e" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
