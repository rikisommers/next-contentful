import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import { ThemeProvider } from "../components/themeContext";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import "../styles/index.scss";
import CursorDot from "../components/utils/cursor-dot";
import CursorCta from "../components/utils/cursor-cta";
import TransitionPage from "../components/transition/pageTransition";

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
              <ThemeProvider>

                <AnimatePresence mode="wait" initial={false}>
                <Navigation />

                  {/* {currentTheme.cursor === 'dot' && <></> } */}
                  {/* <CursorDot key={router.asPath + "dot"} />
                  <CursorCta
                    content={"testing123"}
                    key={router.asPath + "cta"}
                  /> */}



                  <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
              </ThemeProvider>
            </MousePosProvider>
          </ScrollPositionProvider>
        </RouteProvider>
      )}
    </>
  );
}

export default MyApp;
