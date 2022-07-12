import { default as NextApp } from 'next/app';
import Head from 'next/head';
import '../styles.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Stellus Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
