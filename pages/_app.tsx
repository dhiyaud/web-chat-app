import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

// These styles apply to every route in the application
import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <main className={`${inter.variable} font-sans`}>
        <ToastContainer
          hideProgressBar
          position='top-center'
          autoClose={2500}
        />
        <Component {...pageProps} />
      </main>
    </>
  );
}
