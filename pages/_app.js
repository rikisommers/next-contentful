import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import { ToastProvider } from "../components/toastContext";
import { ThemeProvider, useThemeContext } from '../components/themeContext';
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import "../styles/index.scss";
import CursorDot from '../components/utils/cursor-dot';
import CursorCta from '../components/utils/cursor-cta';

function MainContent({ Component, pageProps, router }) {
  const { currentTheme, isThemeDialogOpen } = useThemeContext();

  // useEffect(() => {
  //  console.log('currentTheme', currentTheme)
  // }, [currentTheme]);

  return (
    <>
      <Navigation />
      {/* <motion.div 
          style={{
            backgroundColor:'var(--body-background-color)'
            
          }}
        className="push-content"
        animate={{ 
          width: isThemeDialogOpen ? 'calc(100% - 400px)' : '100%' 
        }}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
      > */}
        
          <AnimatePresence mode="wait" initial={false}>
            {/* {currentTheme.cursor === 'dot' && <></> } */}
            {/* <CursorDot key={router.asPath}/>
            <CursorCta content={'testing123'} key={router.asPath + '2'}/> */}
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
 
      {/* </motion.div> */}
    </>
  );
}

function MyApp({ Component, pageProps, router }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoading]);
  
  return (
    <RouteProvider>
      <ScrollPositionProvider>
        <MousePosProvider>
          <ThemeProvider>
                <Preloader show={isLoading} /> 
                {!isLoading && (  

                <MainContent Component={Component} pageProps={pageProps} router={router} />
                )}
          </ThemeProvider>
          </MousePosProvider>
      </ScrollPositionProvider>
    </RouteProvider>
  );
}


export default MyApp;
