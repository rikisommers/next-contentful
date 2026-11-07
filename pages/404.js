import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getGlobalProps, REVALIDATE_SECONDS } from "../lib/contentful/global";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-col items-center justify-center gap-4 w-full min-h-screen text-center px-4"
    >
      <Head>
        <title>Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1 className="text-4xl">Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="underline">
        Back to the home page
      </Link>
    </main>
  );
}

export async function getStaticProps() {
  return { props: { ...(await getGlobalProps()) }, revalidate: REVALIDATE_SECONDS };
}
