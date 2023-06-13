import "../styles/index.scss";
import { useState, useEffect } from "react";
import { Router , useRouter} from "next/router";
import { Router , useRouter} from "next/router";
import Header from "../components/header";
import Navigation from "../components/nav";
import { AnimatePresence } from "framer-motion";
import "../styles/index.scss";
import AppContext  from "../components/appContext";
import Chrome from "../components/chrome";
function MyApp({ Component, pageProps, router }) {
  
  const [animate,setAnimate] = useState(false)

 // useEffect(() => {

  //   const isDynamicRoute = (router.asPath.startsWith("//"));


  //   router.events.on("routeChangeStart", () => {

  //     console.log(isDynamicRoute)
     
  //   });
  //   router.events.on("routeChangeComplete", () => {
 
  //     console.log('NEW____________',isDynamicRoute)

  //   });
  // }, []);

  return (
    <>
      {/* <Header /> */}
      <Navigation />

      <AnimatePresence
         mode="wait"
        // initial={true}
        // onExitComplete={() => {
        //   console.log("exited");
        // }}
      >
          <Component { ...pageProps } key={router.asPath} />

      </AnimatePresence>
    </>
  );
}

export default MyApp;
