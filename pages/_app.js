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
import { getGlobal,getLoading } from "../lib/api";
import CursorDot from "../components/utils/cursor-dot";
import CursorCta from "../components/utils/cursor-cta";
import TransitionPage from "../components/transition/pageTransition";
import App from 'next/app'; // Import App from next/app

function MyApp({ Component, pageProps, router, globalData }) {
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('GDATA', globalData)

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
              <ThemeProvider thene={globalData.currentTheme}>
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
  
  // Fetch global data from CMS
  const globalData = await getLoading(); // Replace with your API call

  return { ...appProps, globalData };
};



export default MyApp;

