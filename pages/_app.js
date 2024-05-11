import "../styles/index.scss";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "./preloader";
import { getAllImages } from "../lib/api";
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

  // const handleStart = () => setIsLoading(true);
  // const handleComplete = () => {
  //   // Delay setting isLoading to false by 2 seconds
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   // Check if the cookie is set (indicating it's not the initial visit)
  //   if (!Cookies.get('visited')) {
  //     // Set the cookie to indicate that the user has visited
  //     Cookies.set('visited', 'true', { expires: null}); // Expires in 365 days

  //     // Display the preloader only on the initial visit to the home page
  //     if (router.pathname === '/') {
  //       handleStart;
  //     } else {
  //       handleComplete;
  //     }
  //   } else {
  //     handleComplete
  //       }

  //   // router.events.on("routeChangeStart", handleStart);
  //   // router.events.on("routeChangeComplete", handleComplete);
  //   // router.events.on("routeChangeError", handleComplete);

  //   // return () => {
  //   //   router.events.off("routeChangeStart", handleStart);
  //   //   router.events.off("routeChangeComplete", handleComplete);
  //   //   router.events.off("routeChangeError", handleComplete);
  //   // };
  // }, []);

  // const [allImages, setAllImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const images = await getAllImages();
  //       setAllImages(images || []);
  //       console.error("Got it:", allImages);

  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       setAllImages([]); // Set an empty array or handle the error as needed
  //     }
  //   };

  //   fetchImages();
  // }, []);

  return (
    <RouteProvider>
      <ScrollPositionProvider>
        <MousePosProvider>
          {/* {isLoading ? 
         <Preloader /> 
        :  } */}
          <>
            {" "}
            <Navigation />
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-filter">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="6"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </MousePosProvider>
      </ScrollPositionProvider>
    </RouteProvider>
  );
}

export default MyApp;
