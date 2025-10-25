"use client";

import "@/app/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ali Al-bayati</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph Image (for social media) */}
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:title" content="Ali Al-bayati" />
        <meta property="og:description" content="Your description here" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/twitter-image.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
