import React, { useState, useEffect } from "react";
import { AnimatePresence } from "../utils/motion";
import AppProviders from "../components/providers";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import SvgFilters from "../components/base/svg-filters";
import { SkipLinks } from "../components/utils/accessibility-helper";
import "../styles/index.scss";
import { getLoading, getThemes } from "../lib/api";
import App from "next/app";

function MyApp({ Component, pageProps, router, globalData, customThemes }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    window.addEventListener("load", handleLoad);

    const timeout = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  const menuItems = globalData?.menuCollection?.items;

  return (
    <>
      <SkipLinks />

      {globalData?.loadingText && (
        <Preloader
          show={isLoading}
          data={globalData.loadingText}
          logo={globalData.logo}
        />
      )}

      <div
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 ease-in-out w-full h-full`}
      >
        <SvgFilters />

        <AppProviders globalData={globalData} customThemes={customThemes}>
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

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const globalData = await getLoading();
  const customThemes = await getThemes();
  return { ...appProps, globalData, customThemes };
};

export default MyApp;
