import { Html, Head, Main, NextScript } from 'next/document';
const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel='shortcut icon' href='../logo.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
