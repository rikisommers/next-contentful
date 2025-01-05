import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "../components/context/mousePosContext";
import { ScrollPositionProvider } from "../components/context/scrollPosContext";
import { RouteProvider } from "../components/context/routeContext";
import { ThemeProvider } from "../components/context/themeContext";
import { ToastProvider } from "../components/context/toastContext";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import "../styles/index.scss";
import "../styles/prisim-vs-code-dark.scss";
import { getGlobal,getLoading, getThemes } from "../lib/api";
import CursorDot from "../components/utils/cursor-dot";
import CursorCta from "../components/utils/cursor-cta";
import TransitionPage from "../components/transition/pageTransition";
import App from 'next/app'; // Import App from next/app
import { cursorThemes, themes } from "../utils/theme";

function MyApp({ Component, pageProps, router, globalData, customThemes }) {
  const [isLoading, setIsLoading] = useState(true);
  
  //console.log('GDATA', globalData, customThemes)

  useEffect(() => {


    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    },1000 );

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>

      <Preloader show={isLoading} data={globalData} />
      {!isLoading && (
        <RouteProvider>
          <ScrollPositionProvider>
            <MousePosProvider>
              <ToastProvider>
              <ThemeProvider theme={globalData.currentTheme} customThemes={customThemes}>
                <Navigation />
                <AnimatePresence mode="wait" initial={false}>
                {/* <FontLoader 
      primaryFont={currentTheme.fontFamilyPrimary} 
      secondaryFont={currentTheme.fontFamilySecondary}
    > */}


                  {/* {currentTheme.cursor === 'dot' && <></> } */}
                 {/* <CursorDot key={router.asPath + "dot"} /> */}
                  {/* <CursorCta
                    content={"testing123"}
                    key={router.asPath + "cta"}
                  />  */}



                  <Component {...pageProps} key={router.asPath} />
                  {/* </FontLoader> */}

                </AnimatePresence>
              </ThemeProvider>
              </ToastProvider>
            </MousePosProvider>
          </ScrollPositionProvider>
        </RouteProvider>
      )}
    </>
  );
}


MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const globalData = await getLoading(); 
  const customThemes = await getThemes(); 
  return { ...appProps, globalData, customThemes};
};

export default MyApp;

