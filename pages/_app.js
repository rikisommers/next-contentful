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

import CursorDot from "../components/utils/cursor-dot";
import CursorCta from "../components/utils/cursor-cta";
import TransitionPage from "../components/transition/pageTransition";
// import FontLoader from "../utils/fontLoader";

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, );

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>
      <Preloader show={isLoading} />
      {!isLoading && (
        <RouteProvider>
          <ScrollPositionProvider>
            <MousePosProvider>
              <ToastProvider>
              <ThemeProvider>

                <AnimatePresence mode="wait" initial={false}>
                {/* <FontLoader 
      primaryFont={currentTheme.fontFamilyPrimary} 
      secondaryFont={currentTheme.fontFamilySecondary}
    > */}
                <Navigation />

                  {/* {currentTheme.cursor === 'dot' && <></> } */}
                  {/* <CursorDot key={router.asPath + "dot"} />
                  <CursorCta
                    content={"testing123"}
                    key={router.asPath + "cta"}
                  /> */}



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

export default MyApp;
