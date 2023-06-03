import "../styles/index.scss";
import { useState, useEffect } from "react";
import Router from "next/router";
import Header from "../components/header";
import Navigation from "../components/nav";
import { AnimatePresence } from "framer-motion";
import "../styles/index.scss";
import Transition from "../components/transition";

function MyApp({ Component, pageProps, router }) {
  
  return (
    <>
      {/* <Header /> */}
      <Navigation />
      <AnimatePresence
        mode="wait"
        initial={true}
        onExitComplete={() => {
          console.log("exited");
        }}
      >
          <Component {...pageProps} key={router.asPath} />

      </AnimatePresence>
    </>
  );
}

export default MyApp;
