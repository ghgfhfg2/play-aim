import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>실시간 조준 게임</title>
          <meta name="description" content={"실시간으로 즐기는 조준 게임"} />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:title" content="실시간 조준 게임" />
          <meta property="og:type" content="website" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6788425959877259"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
