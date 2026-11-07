import React, { useState, useEffect } from "react";
import Head from "next/head";
import { AnimatePresence } from "../utils/motion";
import AppProviders from "../components/providers";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import SvgFilters from "../components/base/svg-filters";
import { SkipLinks } from "../components/utils/accessibility-helper";
import "../styles/index.scss";

const PRELOAD_MAX_MS = 700;
const VISITED_KEY = "visited";

function MyApp({ Component, pageProps, router }) {
  const { globalData, customThemes, footerData } = pageProps;
  const [isLoading, setIsLoading] = useState(true);

  // The preloader is only a curtain: page content is always in the DOM (and in the
  // server HTML), and the curtain shows at most once per session.
  useEffect(() => {
    let alreadyVisited = false;
    try {
      alreadyVisited = window.sessionStorage.getItem(VISITED_KEY) === "1";
      window.sessionStorage.setItem(VISITED_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    if (alreadyVisited) {
      setIsLoading(false);
      return undefined;
    }

    const done = () => setIsLoading(false);
    if (document.readyState === "complete") {
      done();
      return undefined;
    }
    window.addEventListener("load", done);
    const timeout = setTimeout(done, PRELOAD_MAX_MS);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(timeout);
    };
  }, []);

  const menuItems = globalData?.menuCollection?.items;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SkipLinks />

      {globalData?.loadingText && (
        <Preloader
          show={isLoading}
          data={globalData.loadingText}
          logo={globalData.logo}
        />
      )}

      <div className="w-full h-full">
        <SvgFilters />

        <AppProviders globalData={globalData} footerData={footerData}>
          {menuItems && menuItems.length > 0 && (
            <Navigation
              title={globalData.sitetitle}
              data={menuItems}
              logo={globalData.logo}
              customThemes={customThemes}
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </AppProviders>
      </div>
    </>
  );
}

export default MyApp;
